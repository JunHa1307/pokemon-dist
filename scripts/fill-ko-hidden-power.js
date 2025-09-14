/*
  Usage: node scripts/fill-ko-hidden-power.js
  Adds missing "Hidden Power <Type>" Korean translations as "잠재파워-<타입>"
  using the type Korean names already present in locales/ko/translation.json.
*/

const fs = require('fs');
const path = require('path');

const koPath = path.resolve('locales/ko/translation.json');
const ko = require(koPath);

const typeKo = {
  Bug: '벌레',
  Dark: '악',
  Dragon: '드래곤',
  Electric: '전기',
  Fighting: '격투',
  Fire: '불꽃',
  Flying: '비행',
  Ghost: '고스트',
  Grass: '풀',
  Ground: '땅',
  Ice: '얼음',
  Poison: '독',
  Psychic: '에스퍼',
  Rock: '바위',
  Steel: '강철',
  Water: '물',
};

const keys = Object.keys(typeKo).map((t) => `Hidden Power ${t}`);

let added = 0;
for (const k of keys) {
  if (!(k in ko)) {
    const t = k.split(' ').pop();
    ko[k] = `잠재파워-${typeKo[t]}`;
    added++;
  }
}

if (added) {
  fs.writeFileSync(koPath, JSON.stringify(ko, null, 2) + '\n', 'utf8');
  console.log(`Added ${added} Hidden Power type translations to ko.`);
} else {
  console.log('No Hidden Power type translations were missing.');
}

