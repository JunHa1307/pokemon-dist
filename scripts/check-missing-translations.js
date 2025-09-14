/*
  Usage: node scripts/check-missing-translations.js
  Prints counts and lists of missing translation keys for en/ko
  based on calc/data/{abilities,items,moves,species}.js
*/

const path = require('path');

function loadJSON(p) {
  return require(path.resolve(p));
}

function loadModule(p, exportName) {
  const mod = require(path.resolve(p));
  return mod[exportName];
}

const flattenUnique = (arr) => [...new Set(arr.flat())];

function keysFromArrayOfNameArrays(arr) {
  return flattenUnique(arr).filter((v) => typeof v === 'string');
}

function keysFromArrayOfObjects(arr) {
  const set = new Set();
  for (const obj of arr) {
    if (!obj || typeof obj !== 'object') continue;
    for (const k of Object.keys(obj)) set.add(k);
  }
  return [...set];
}

function getAbilityNames() {
  const ABILITIES = loadModule('calc/data/abilities.js', 'ABILITIES');
  return keysFromArrayOfNameArrays(ABILITIES);
}

function getItemNames() {
  const ITEMS = loadModule('calc/data/items.js', 'ITEMS');
  return keysFromArrayOfNameArrays(ITEMS);
}

function getMoveNames() {
  const MOVES = loadModule('calc/data/moves.js', 'MOVES');
  return keysFromArrayOfObjects(MOVES);
}

function getSpeciesNames() {
  const SPECIES = loadModule('calc/data/species.js', 'SPECIES');
  return keysFromArrayOfObjects(SPECIES);
}

function missingKeys(names, dict) {
  return names.filter((n) => !(n in dict));
}

function main() {
  const en = loadJSON('locales/en/translation.json');
  const ko = loadJSON('locales/ko/translation.json');

  const datasets = [
    ['abilities', getAbilityNames],
    ['items', getItemNames],
    ['moves', getMoveNames],
    ['species', getSpeciesNames],
  ];

  for (const [label, getter] of datasets) {
    let names;
    try {
      names = getter();
    } catch (e) {
      console.error(`Error loading ${label}:`, e && e.message);
      continue;
    }
    const missEn = missingKeys(names, en);
    const missKo = missingKeys(names, ko);
    console.log(`${label}: en missing ${missEn.length}, ko missing ${missKo.length}`);
    if (missKo.length) {
      console.log(`  ko missing sample:`, missKo.slice(0, 20));
      if (label === 'abilities' || label === 'moves') {
        console.log(`  ko missing full list for ${label}:`);
        console.log(missKo.join(', '));
      }
    }
  }
}

main();
