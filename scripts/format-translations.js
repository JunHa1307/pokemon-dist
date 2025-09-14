/*
  Usage: node scripts/format-translations.js
  Rewrites locales/en/translation.json and locales/ko/translation.json so that:
  - Both files contain the same set of keys (union of en+ko and dataset keys)
  - Keys are ordered by category: UI (non-dataset) alphabetical, then
    Abilities (dataset order), Items (dataset order), Moves (alphabetical),
    Species (alphabetical)
  - Pretty-prints with 2-space indent and trailing newline so corresponding
    keys appear on the same line in both files.
*/

const fs = require('fs');
const path = require('path');

function loadJSON(p) { return require(path.resolve(p)); }
function saveJSON(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8'); }
function loadModule(p, exportName) { return require(path.resolve(p))[exportName]; }

const flattenUnique = (arr) => [...new Set(arr.flat())];
const keysFromArrayOfNameArrays = (arr) => flattenUnique(arr).filter((v) => typeof v === 'string');
function keysFromArrayOfObjects(arr) {
  const set = new Set();
  for (const obj of arr) { if (obj && typeof obj === 'object') for (const k of Object.keys(obj)) set.add(k); }
  return [...set];
}

function getAbilityNames() { return keysFromArrayOfNameArrays(loadModule('calc/data/abilities.js', 'ABILITIES')); }
function getItemNames() { return keysFromArrayOfNameArrays(loadModule('calc/data/items.js', 'ITEMS')); }
function getMoveNames() { return keysFromArrayOfObjects(loadModule('calc/data/moves.js', 'MOVES')).sort((a,b)=>a.localeCompare(b)); }
function getSpeciesNames() { return keysFromArrayOfObjects(loadModule('calc/data/species.js', 'SPECIES')).sort((a,b)=>a.localeCompare(b)); }

function main() {
  const enPath = path.resolve('locales/en/translation.json');
  const koPath = path.resolve('locales/ko/translation.json');
  const en = loadJSON(enPath);
  const ko = loadJSON(koPath);

  const abilities = getAbilityNames();
  const items = getItemNames();
  const moves = getMoveNames();
  const species = getSpeciesNames();

  const datasetSet = new Set([...abilities, ...items, ...moves, ...species]);
  const unionKeys = new Set([...Object.keys(en), ...Object.keys(ko), ...datasetSet]);

  // UI keys = not in datasets
  const uiKeys = [...unionKeys].filter((k) => !datasetSet.has(k)).sort((a,b)=>a.localeCompare(b));

  const order = [...uiKeys, ...abilities, ...items, ...moves, ...species];

  const enOrdered = {};
  const koOrdered = {};

  for (const k of order) {
    if (!unionKeys.has(k)) continue; // shouldn't happen
    enOrdered[k] = Object.prototype.hasOwnProperty.call(en, k) ? en[k] : k;
    koOrdered[k] = Object.prototype.hasOwnProperty.call(ko, k) ? ko[k] : enOrdered[k];
  }

  saveJSON(enPath, enOrdered);
  saveJSON(koPath, koOrdered);
  console.log(`Formatted translations. Total keys: ${order.length}`);
}

main();

