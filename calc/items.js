"use strict";
exports.__esModule = true;

var util_1 = require("./util");
exports.SEED_BOOSTED_STAT = {
    '일렉트릭시드': 'def',
    '그래스시드': 'def',
    '미스트시드': 'spd',
    '사이코시드': 'spd'
};
function getItemBoostType(item) {
    switch (item) {
        case '용의플레이트':
        case '용의이빨':
            return 'Dragon';
        case '공포플레이트':
        case '검은안경':
            return 'Dark';
        case '대지플레이트':
        case '부드러운모래':
            return 'Ground';
        case '주먹플레이트':
        case '검은띠':
            return 'Fighting';
        case '불구슬플레이트':
        case '목탄':
            return 'Fire';
        case '고드름플레이트':
        case '녹지않는얼음':
            return 'Ice';
        case '비단벌레플레이트':
        case '은빛가루':
            return 'Bug';
        case '강철플레이트':
        case '금속코트':
            return 'Steel';
        case '초록플레이트':
        case '꽃향로':
        case '기적의씨':
            return 'Grass';
        case '이상한플레이트':
        case '괴상한향로':
        case '휘어진스푼':
            return 'Psychic';
        case '정령플레이트':
            return 'Fairy';
        case '푸른하늘플레이트':
        case '예리한부리':
            return 'Flying';
        case '물방울플레이트':
        case '바닷물향로':
        case '잔물결향로':
        case '신비의물방울':
            return 'Water';
        case '원령플레이트':
        case '저주의부적':
            return 'Ghost';
        case '암석플레이트':
        case '암석향로':
        case '딱딱한돌':
            return 'Rock';
        case '맹독플레이트':
        case '독바늘':
            return 'Poison';
        case '우뢰플레이트':
        case '자석':
            return 'Electric';
        case '실크스카프':
        case '핑크빛리본':
        case '물방울리본':
            return 'Normal';
        default:
            return undefined;
    }
}
exports.getItemBoostType = getItemBoostType;
function getBerryResistType(berry) {
    switch (berry) {
        case '카리열매':
            return 'Normal';
        case '오카열매':
            return 'Fire';
        case '꼬시개열매':
            return 'Water';
        case '초나열매':
            return 'Electric';
        case '린드열매':
            return 'Grass';
        case '플카열매':
            return 'Ice';
        case '로플열매':
            return 'Fighting';
        case '으름열매':
            return 'Poison';
        case '슈캐열매':
            return 'Ground';
        case '바코열매':
            return 'Flying';
        case '야파열매':
            return 'Psychic';
        case '리체열매':
            return 'Bug';
        case '루미열매':
            return 'Rock';
        case '수불열매':
            return 'Ghost';
        case '하반열매':
            return 'Dragon';
        case '마코열매':
            return 'Dark';
        case '바리비열매':
            return 'Steel';
        case '로셀열매':
            return 'Fairy';
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
    '딱딱한돌',
    '룸서비스',
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
    '심해의이빨',
    '굵은뼈',
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
    '돌격조끼',
    '허탕보험',
    '이빠진포트',
    '깨진포트',
    '통굽부츠',
    '약점보험',
    '선제공격손톱',
    'Dawn Stone',
    'Dusk Stone',
    '에레키부스터',
    '마그마부스터',
    '동글동글돌',
    '프로텍터',
    '향기주머니',
    '휘핑팝',
    '예리한손톱',
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
    '독바늘',
    '용의이빨',
    '파워앵클릿',
    '파워밴드',
    '파워벨트',
    '파워리스트',
    '파워렌즈',
    '파워웨이트',
]);
var FLING_60 = new Set([
    '금강옥',
    '축축한바위',
    '뜨거운바위',
    '대파',
    '백옥',
    '교정깁스',
    '울퉁불퉁멧',
    'Stick',
    '만능우산',
    '그라운드코트',
]);
var FLING_30 = new Set([
    '구근',
    '검은띠',
    '검은오물',
    '검은안경',
    '충전지',
    '목탄',
    '심해의비늘',
    '화염구슬',
    '왕의징표석',
    '생명의구슬',
    '전기구슬',
    '빛의점토',
    '자석',
    '금속코트',
    '기적의씨',
    '신비의물방울',
    '녹지않는얼음',
    '예리한이빨',
    '초점렌즈',
    '마음의물방울',
    '저주의부적',
    '달콤한사과',
    '새콤한사과',
    '목스프레이',
    '맹독구슬',
    '휘어진스푼',
    '용의비늘',
    'Energy Powder',
    'Fire Stone',
    'Leaf Stone',
    'Moon Stone',
    'Sun Stone',
    'Thunder Stone',
    'Up-Grade',
    'Water Stone',
    '나무열매주스',
    '검은오물',
    '고운비늘',
    'Ice Stone',
    '금왕관',
    '빛이끼',
    '탈출버튼',
    '눈덩이',
    '은왕관',
]);
var FLING_10 = new Set([
    '풍선',
    '베리사탕공예',
    '구애머리띠',
    '구애스카프',
    '구애안경',
    '네잎사탕공예',
    '빨간실',
    '일렉트릭시드',
    '달인의띠',
    '꽃사탕공예',
    '기합의머리띠',
    '기합의띠',
    '만복향로',
    '그래스시드',
    '느림보꼬리',
    '무사태평향로',
    '먹다남은음식',
    '하트사탕공예',
    '멘탈허브',
    '금속파우더',
    '박하열매',
    '기적의열매',
    '미스트시드',
    '힘의머리띠',
    '파워Grass허브',
    '사이코시드',
    '괴상한향로',
    '스피드파우더',
    '영계의천',
    '레드카드',
    '리본사탕공예',
    '겨냥표적',
    '암석향로',
    '꽃향로',
    '바닷물향로',
    '아름다운허물',
    '실크스카프',
    '은빛가루',
    '보송보송바위',
    '부드러운모래',
    '평온의방울',
    '스타사탕공예',
    '딸기사탕공예',
    '잔물결향로',
    '하양허브',
    '광각렌즈',
    '박식안경',
    '포커스렌즈',
    '은빛가루',
    '파워Grass허브',
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
    if (['검은철구', 'TR43', 'TR71'].includes(item))
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
    if (['탈출팩', '예리한부리', '괴상한패치'].includes(item))
        return 50;
    if (['차가운바위', '진화의휘석', '럭키펀치'].includes(item))
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
    return gift ? { t: gift.type, p: gift.basePower } : { t: 'Normal', p: 1 };
}
exports.getNaturalGift = getNaturalGift;
function getTechnoBlast(item) {
    switch (item) {
        case '블레이즈카세트':
            return 'Fire';
        case '프리즈카세트':
            return 'Ice';
        case '아쿠아카세트':
            return 'Water';
        case '번개카세트':
            return 'Electric';
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