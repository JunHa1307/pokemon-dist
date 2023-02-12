"use strict";
exports.__esModule = true;

var util_1 = require("./util");
exports.SEED_BOOSTED_STAT = {
    '일렉트릭 시드': 'def',
    'Grassy Seed': 'def',
    'Misty Seed': 'spd',
    '사이코시드': 'spd'
};
function getItemBoostType(item) {
    switch (item) {
        case 'Draco Plate':
        case 'Dragon Fang':
            return '드래곤';
        case 'Dread Plate':
        case 'Black Glasses':
            return '악';
        case 'Earth Plate':
        case 'Soft Sand':
            return '땅';
        case 'Fist Plate':
        case 'Black Belt':
            return '격투';
        case 'Flame Plate':
        case 'Charcoal':
            return '불꽃';
        case 'Icicle Plate':
        case 'Never-Melt Ice':
            return '얼음';
        case 'Insect Plate':
        case 'Silver Powder':
            return '벌레';
        case 'Iron Plate':
        case 'Metal Coat':
            return '강철';
        case 'Meadow Plate':
        case 'Rose Incense':
        case 'Miracle Seed':
            return '풀';
        case 'Mind Plate':
        case 'Odd Incense':
        case 'Twisted Spoon':
            return '에스퍼';
        case 'Pixie Plate':
            return '페어리';
        case 'Sky Plate':
        case 'Sharp Beak':
            return '비행';
        case 'Splash Plate':
        case 'Sea Incense':
        case 'Wave Incense':
        case 'Mystic Water':
            return '물';
        case 'Spooky Plate':
        case 'Spell Tag':
            return '고스트';
        case 'Stone Plate':
        case 'Rock Incense':
        case 'Hard Stone':
            return '바위';
        case 'Toxic Plate':
        case 'Poison Barb':
            return '독';
        case 'Zap Plate':
        case 'Magnet':
            return '전기';
        case 'Silk Scarf':
        case 'Pink Bow':
        case 'Polkadot Bow':
            return '노말';
        default:
            return undefined;
    }
}
exports.getItemBoostType = getItemBoostType;
function getBerryResistType(berry) {
    switch (berry) {
        case 'Chilan Berry':
            return '노말';
        case 'Occa Berry':
            return '불꽃';
        case 'Passho Berry':
            return '물';
        case 'Wacan Berry':
            return '전기';
        case 'Rindo Berry':
            return '풀';
        case 'Yache Berry':
            return '얼음';
        case 'Chople Berry':
            return '격투';
        case 'Kebia Berry':
            return '독';
        case 'Shuca Berry':
            return '땅';
        case 'Coba Berry':
            return '비행';
        case 'Payapa Berry':
            return '에스퍼';
        case 'Tanga Berry':
            return '벌레';
        case 'Charti Berry':
            return '바위';
        case 'Kasib Berry':
            return '고스트';
        case 'Haban Berry':
            return '드래곤';
        case 'Colbur Berry':
            return '악';
        case 'Babiri Berry':
            return '강철';
        case 'Roseli Berry':
            return '페어리';
        default:
            return undefined;
    }
}
exports.getBerryResistType = getBerryResistType;
var FLING_120 = new Set([
    'TR24',
    'TR28',
    'TR34',
    'TR39',
    'TR53',
    'TR55',
    'TR64',
    'TR66',
    'TR72',
    'TR73',
]);
var FLING_100 = new Set([
    'Hard Stone',
    'Room Service',
    'Claw Fossil',
    'Dome Fossil',
    'Helix Fossil',
    'Old Amber',
    'Root Fossil',
    'Armor Fossil',
    'Old Amber',
    'Fossilized Bird',
    'Fossilized Dino',
    'Fossilized Drake',
    'Fossilized Fish',
    'Plume Fossil',
    'Jaw Fossil',
    'Cover Fossil',
    'Sail Fossil',
    'Rare Bone',
    'Skull Fossil',
    'TR10',
    'TR31',
    'TR75',
]);
var FLING_90 = new Set([
    'Deep Sea Tooth',
    'Thick Club',
    'TR02',
    'TR04',
    'TR05',
    'TR08',
    'TR11',
    'TR22',
    'TR35',
    'TR42',
    'TR45',
    'TR50',
    'TR61',
    'TR65',
    'TR67',
    'TR86',
    'TR90',
    'TR96',
]);
var FLING_85 = new Set(['TR01', 'TR41', 'TR62', 'TR93', 'TR97', 'TR98']);
var FLING_80 = new Set([
    'Assault Vest',
    'Blunder Policy',
    'Chipped Pot',
    'Cracked Pot',
    'Heavy-Duty Boots',
    'Weakness Policy',
    'Quick Claw',
    'Dawn Stone',
    'Dusk Stone',
    'Electirizer',
    'Magmarizer',
    'Oval Stone',
    'Protector',
    'Sachet',
    'Whipped Dream',
    'Razor Claw',
    'Shiny Stone',
    'TR16',
    'TR18',
    'TR19',
    'TR25',
    'TR32',
    'TR33',
    'TR47',
    'TR56',
    'TR57',
    'TR58',
    'TR59',
    'TR60',
    'TR63',
    'TR69',
    'TR70',
    'TR74',
    'TR84',
    'TR87',
    'TR92',
    'TR95',
    'TR99',
]);
var FLING_70 = new Set([
    'Poison Barb',
    'Dragon Fang',
    'Power Anklet',
    'Power Band',
    'Power Belt',
    'Power Bracer',
    'Power Lens',
    'Power Weight',
]);
var FLING_60 = new Set([
    'Adamant Orb',
    'Damp Rock',
    'Heat Rock',
    'Leek',
    'Lustrous Orb',
    'Macho Brace',
    'Rocky Helmet',
    'Stick',
    'Utility Umbrella',
    'Terrain Extender',
]);
var FLING_30 = new Set([
    'Absorb Bulb',
    'Black Belt',
    'Black Sludge',
    'Black Glasses',
    'Cell Battery',
    'Charcoal',
    'Deep Sea Scale',
    'Flame Orb',
    'King\'s Rock',
    'Life Orb',
    'Light Ball',
    'Light Clay',
    'Magnet',
    'Metal Coat',
    'Miracle Seed',
    'Mystic Water',
    'Never-Melt Ice',
    'Razor Fang',
    'Scope Lens',
    'Soul Dew',
    'Spell Tag',
    'Sweet Apple',
    'Tart Apple',
    'Throat Spray',
    'Toxic Orb',
    'Twisted Spoon',
    'Dragon Scale',
    'Energy Powder',
    'Fire Stone',
    'Leaf Stone',
    'Moon Stone',
    'Sun Stone',
    'Thunder Stone',
    'Up-Grade',
    'Water Stone',
    'Berry Juice',
    'Black Sludge',
    'Prism Scale',
    'Ice Stone',
    'Gold Bottle Cap',
    'Luminous Moss',
    'Eject Button',
    'Snowball',
    'Bottle Cap',
]);
var FLING_10 = new Set([
    'Air Balloon',
    'Berry Sweet',
    'Choice Band',
    'Choice Scarf',
    'Choice Specs',
    'Clover Sweet',
    'Destiny Knot',
    '일렉트릭 시드',
    'Expert Belt',
    'Flower Sweet',
    'Focus Band',
    'Focus Sash',
    'Full Incense',
    'Grassy Seed',
    'Lagging Tail',
    'Lax Incense',
    'Leftovers',
    'Love Sweet',
    'Mental Herb',
    'Metal Powder',
    'Mint Berry',
    'Miracle Berry',
    'Misty Seed',
    'Muscle Band',
    'Power Herb',
    '사이코시드',
    'Odd Incense',
    'Quick Powder',
    'Reaper Cloth',
    'Red Card',
    'Ribbon Sweet',
    'Ring Target',
    'Rock Incense',
    'Rose Incense',
    'Sea Incense',
    'Shed Shell',
    'Silk Scarf',
    'Silver Powder',
    'Smooth Rock',
    'Soft Sand',
    'Soothe Bell',
    'Star Sweet',
    'Strawberry Sweet',
    'Wave Incense',
    'White Herb',
    'Wide Lens',
    'Wise Glasses',
    'Zoom Lens',
    'Silver Powder',
    'Power Herb',
    'TR00',
    'TR07',
    'TR12',
    'TR13',
    'TR14',
    'TR17',
    'TR20',
    'TR21',
    'TR23',
    'TR26',
    'TR27',
    'TR29',
    'TR30',
    'TR37',
    'TR38',
    'TR40',
    'TR44',
    'TR46',
    'TR48',
    'TR49',
    'TR51',
    'TR52',
    'TR54',
    'TR68',
    'TR76',
    'TR77',
    'TR79',
    'TR80',
    'TR83',
    'TR85',
    'TR88',
    'TR91',
]);
function getFlingPower(item) {
    if (!item)
        return 0;
    if (['Iron Ball', 'TR43', 'TR71'].includes(item))
        return 130;
    if (FLING_120.has(item))
        return 85;
    if (['TR03', 'TR06', 'TR09', 'TR15', 'TR89'].includes(item))
        return 110;
    if (FLING_100.has(item))
        return 100;
    if (['TR36', 'TR78', 'TR81', 'TR94'].includes(item))
        return 95;
    if (item.includes('Plate') || FLING_90.has(item))
        return 90;
    if (FLING_85.has(item))
        return 85;
    if (FLING_80.has(item))
        return 80;
    if (FLING_70.has(item))
        return 70;
    if (FLING_60.has(item))
        return 60;
    if (['Eject Pack', 'Sharp Beak', 'Dubious Disc'].includes(item))
        return 50;
    if (['Icy Rock', 'Eviolite', 'Lucky Punch'].includes(item))
        return 40;
    if (FLING_30.has(item))
        return 30;
    if (item === 'TR82')
        return 20;
    if (item.includes('Berry') || FLING_10.has(item))
        return 10;
    return 0;
}
exports.getFlingPower = getFlingPower;
function getNaturalGift(gen, item) {
    var _a;
    var gift = (_a = gen.items.get((0, util_1.toID)(item))) === null || _a === void 0 ? void 0 : _a.naturalGift;
    return gift ? { t: gift.type, p: gift.basePower } : { t: '노말', p: 1 };
}
exports.getNaturalGift = getNaturalGift;
function getTechnoBlast(item) {
    switch (item) {
        case 'Burn Drive':
            return '불꽃';
        case 'Chill Drive':
            return '얼음';
        case 'Douse Drive':
            return '물';
        case 'Shock Drive':
            return '전기';
        default:
            return undefined;
    }
}
exports.getTechnoBlast = getTechnoBlast;
function getMultiAttack(item) {
    if (item.includes('Memory')) {
        return item.substring(0, item.indexOf(' '));
    }
    return undefined;
}
exports.getMultiAttack = getMultiAttack;
//# sourceMappingURL=items.js.map