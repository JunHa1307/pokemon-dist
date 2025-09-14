/*
  Usage: node scripts/fill-missing-en.js
  Adds any missing abilities/items/moves/species keys to locales/en/translation.json
  with English fallbacks.
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
  for (const obj of arr) {
    if (!obj || typeof obj !== 'object') continue;
    for (const k of Object.keys(obj)) set.add(k);
  }
  return [...set];
}

function getAbilityNames() { return keysFromArrayOfNameArrays(loadModule('calc/data/abilities.js', 'ABILITIES')); }
function getItemNames() { return keysFromArrayOfNameArrays(loadModule('calc/data/items.js', 'ITEMS')); }
function getMoveNames() { return keysFromArrayOfObjects(loadModule('calc/data/moves.js', 'MOVES')); }
function getSpeciesNames() { return keysFromArrayOfObjects(loadModule('calc/data/species.js', 'SPECIES')); }

function main() {
  const enPath = path.resolve('locales/en/translation.json');
  const en = loadJSON(enPath);
  const datasets = [
    ['abilities', getAbilityNames],
    ['items', getItemNames],
    ['moves', getMoveNames],
    ['species', getSpeciesNames],
  ];
  let added = 0;
  for (const [label, getter] of datasets) {
    let names;
    try { names = getter(); } catch (e) { console.error(`Error loading ${label}:`, e && e.message); continue; }
    const miss = names.filter((n) => !(n in en));
    for (const k of miss) en[k] = k;
    added += miss.length;
    console.log(`${label}: added ${miss.length}`);
  }
  if (added > 0) {
    saveJSON(enPath, en);
    console.log(`Saved locales/en/translation.json (added ${added}).`);
  } else {
    console.log('No changes to en translations.');
  }
}

main();

