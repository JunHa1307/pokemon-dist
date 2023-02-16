"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a, e_2, _b;
exports.__esModule = true;

var util_1 = require("../util");
var RBY = [];
var GSC = [
    '나무열매주스',
    'Berry',
    '파괴의유전자',
    '쓴맛나무열매',
    '검은띠',
    '검은안경',
    '반짝가루',
    '불탄나무열매',
    '목탄',
    '용의이빨',
    '용의비늘',
    '스피드볼',
    'Fire Stone',
    '기합의머리띠',
    'Friend Ball',
    '황금열매',
    '수퍼볼',
    '딱딱한돌',
    '헤비볼',
    '얼은나무열매',
    '왕의징표석',
    'Leaf Stone',
    '먹다남은음식',
    '레벨볼',
    '전기구슬',
    '러브볼',
    '럭키펀치',
    '루어볼',
    '자석',
    'Mail',
    '마스터볼',
    '금속코트',
    '금속파우더',
    '박하열매',
    '기적의열매',
    '기적의씨',
    '문볼',
    'Moon Stone',
    '이상한나무열매',
    '신비의물방울',
    '녹지않는얼음',
    '핑크빛리본',
    '독바늘',
    '몬스터볼',
    '물방울리본',
    '마비치료제',
    '마비치료제',
    '선제공격손톱',
    '사파리볼',
    '초점렌즈',
    '예리한부리',
    '은빛가루',
    '부드러운모래',
    '저주의부적',
    '컴퍼티션볼',
    'Stick',
    'Sun Stone',
    '굵은뼈',
    'Thunder Stone',
    '휘어진스푼',
    '하이퍼볼',
    'Up-Grade',
    'Water Stone',
];
var GSC_ONLY = [
    'Berry',
    '파괴의유전자',
    '쓴맛나무열매',
    '불탄나무열매',
    '얼은나무열매',
    '박하열매',
    '기적의열매',
    '이상한나무열매',
    '마비치료제',
    '황금열매',
    '핑크빛리본',
    '물방울리본',
    '마비치료제',
    '의문열매',
];
var ADV = GSC.filter(function (i) { return !GSC_ONLY.includes(i); }).concat([
    '아바열매',
    '규살열매',
    '배리열매',
    '루베열매',
    '블리열매',
    '버치열매',
    '유루열매',
    '구애머리띠',
    'Claw Fossil',
    '수숙열매',
    '심해의비늘',
    '심해의이빨',
    '다이브볼',
    'Dome Fossil',
    '두리열매',
    '의문열매',
    '무화열매',
    '용아열매',
    '또뽀열매',
    'Helix Fossil',
    '로매열매',
    '파야열매',
    '시마열매',
    '랑사열매',
    '무사태평향로',
    '과사열매',
    '치리열매',
    '리샘열매',
    '럭셔리볼',
    '교정깁스',
    '마고열매',
    '고스티열매',
    '멘탈허브',
    '나나열매',
    '네스트볼',
    '네트볼',
    '노멜열매',
    'Old Amber',
    '오랭열매',
    '자야열매',
    '복슝열매',
    '시몬열매',
    '야타비열매',
    '파인열매',
    '유석열매',
    '프리미어볼',
    '파비열매',
    '라부탐열매',
    '복분열매',
    '라즈열매',
    '리피트볼',
    'Root Fossil',
    '캄라열매',
    '바닷물향로',
    '조개껍질방울',
    '실크스카프',
    '자뭉열매',
    '마음의물방울',
    '메호키열매',
    '스타열매',
    '토망열매',
    '타이머볼',
    '슈박열매',
    '서배열매',
    '하양허브',
    '위키열매',
]);
var DPP = ADV.concat([
    '금강옥',
    'Armor Fossil',
    '바리비열매',
    '큰뿌리',
    '검은오물',
    '루미열매',
    '프레셔스볼',
    '카리열매',
    '구애스카프',
    '구애안경',
    '로플열매',
    '바코열매',
    '마코열매',
    '애슈열매',
    '축축한바위',
    'Dawn Stone',
    '빨간실',
    '용의플레이트',
    '공포플레이트',
    '괴상한패치',
    'Dusk Ball',
    'Dusk Stone',
    '대지플레이트',
    '에레키부스터',
    '달인의띠',
    '주먹플레이트',
    '화염구슬',
    '불구슬플레이트',
    '기합의띠',
    '만복향로',
    '끈기갈고리손톱',
    '백금옥',
    '하반열매',
    '힐볼',
    '뜨거운바위',
    '고드름플레이트',
    '차가운바위',
    '비단벌레플레이트',
    '검은철구',
    '강철플레이트',
    '자보열매',
    '수불열매',
    '으름열매',
    '느림보꼬리',
    '생명의구슬',
    '빛의점토',
    '백옥',
    '마그마부스터',
    '초록플레이트',
    '메트로놈',
    '미클열매',
    '이상한플레이트',
    '힘의머리띠',
    '오카열매',
    '괴상한향로',
    '동글동글돌',
    '파크볼',
    '꼬시개열매',
    '야파열매',
    '파워앵클릿',
    '파워밴드',
    '파워벨트',
    '파워리스트',
    '파워Grass허브',
    '파워렌즈',
    '파워웨이트',
    '프로텍터',
    '퀵볼',
    '스피드파우더',
    'Rare Bone',
    '예리한손톱',
    '예리한이빨',
    '영계의천',
    '린드열매',
    '암석향로',
    '꽃향로',
    '애터열매',
    '아름다운허물',
    'Shiny Stone',
    '슈캐열매',
    'Skull Fossil',
    '푸른하늘플레이트',
    '보송보송바위',
    '물방울플레이트',
    '원령플레이트',
    '끈적끈적바늘',
    '암석플레이트',
    '리체열매',
    '맹독구슬',
    '맹독플레이트',
    '초나열매',
    '잔물결향로',
    '광각렌즈',
    '박식안경',
    '플카열매',
    '우뢰플레이트',
    '포커스렌즈',
]);
var BW = DPP.concat([
    '구근',
    '풍선',
    '조임밴드',
    'Bug주얼',
    '블레이즈카세트',
    '충전지',
    '프리즈카세트',
    'Cover Fossil',
    'Dark주얼',
    '아쿠아카세트',
    'Dragon주얼',
    '드림볼',
    '탈출버튼',
    'Electric주얼',
    '진화의휘석',
    'Fighting주얼',
    'Fire주얼',
    '가벼운돌',
    'Flying주얼',
    'Ghost주얼',
    'Grass주얼',
    'Ground주얼',
    'Ice주얼',
    'Normal주얼',
    'Plume Fossil',
    'Poison주얼',
    '고운비늘',
    'Psychic주얼',
    '레드카드',
    '겨냥표적',
    'Rock주얼',
    '울퉁불퉁멧',
    '번개카세트',
    'Steel주얼',
    'Water주얼',
]);
exports.MEGA_STONES = {
    앱솔나이트: 'Absol',
    눈설왕나이트: 'Abomasnow',
    프테라나이트: 'Aerodactyl',
    보스로라나이트: 'Aggron',
    후디나이트: 'Alakazam',
    파비코리나이트: 'Altaria',
    전룡나이트: 'Ampharos',
    다부니나이트: 'Audino',
    다크펫나이트: 'Banette',
    독침붕나이트: 'Beedrill',
    거북왕나이트: 'Blastoise',
    번치코나이트: 'Blaziken',
    폭타나이트: 'Camerupt',
    '리자몽나이트X': 'Charizard',
    '리자몽나이트Y': 'Charizard',
    Crucibellite: 'Crucibelle',
    디안시나이트: 'Diancie',
    엘레이드나이트: 'Gallade',
    한카리아스나이트: 'Garchomp',
    가디안나이트: 'Gardevoir',
    팬텀나이트: 'Gengar',
    얼음귀신나이트: 'Glalie',
    갸라도스나이트: 'Gyarados',
    헤라크로스나이트: 'Heracross',
    헬가나이트: 'Houndoom',
    캥카나이트: 'Kangaskhan',
    라티아스나이트: 'Latias',
    라티오스나이트: 'Latios',
    이어롭나이트: 'Lopunny',
    루카리오나이트: 'Lucario',
    썬더볼트나이트: 'Manectric',
    입치트나이트: 'Mawile',
    요가램나이트: 'Medicham',
    메타그로스나이트: 'Metagross',
    '뮤츠나이트X': 'Mewtwo',
    '뮤츠나이트Y': 'Mewtwo',
    피죤투나이트: 'Pidgeot',
    쁘사이저나이트: 'Pinsir',
    깜까미나이트: 'Sableye',
    보만다나이트: 'Salamence',
    나무킹나이트: 'Sceptile',
    핫삼나이트: 'Scizor',
    샤크니아나이트: 'Sharpedo',
    야도란나이트: 'Slowbro',
    강철톤나이트: 'Steelix',
    대짱이나이트: 'Swampert',
    마기라스나이트: 'Tyranitar',
    이상해꽃나이트: '이상해꽃'
};
var XY = BW.concat(__spreadArray(__spreadArray([], __read(Object.keys(exports.MEGA_STONES)), false), [
    '돌격조끼',
    '쪽빛구슬',
    'Fairy주얼',
    'Jaw Fossil',
    '악키열매',
    '빛이끼',
    '타라프열매',
    '정령플레이트',
    '주홍구슬',
    '로셀열매',
    '향기주머니',
    '방진고글',
    'Sail Fossil',
    '눈덩이',
    '약점보험',
    '휘핑팝',
], false).sort());
var SM = XY.filter(function (i) { return i !== 'Old Amber'; }).concat([
    '주눅구슬',
    '알로라이Z',
    '울트라볼',
    '은왕관',
    '버그메모리',
    '벌레Z',
    '다크메모리',
    '악Z',
    '모크나이퍼Z',
    '드래곤메모리',
    '드래곤Z',
    '이브이Z',
    '일렉트릭메모리',
    '일렉트릭시드',
    '전기Z',
    '페어리Z',
    '페어리메모리',
    '파이팅메모리',
    '격투Z',
    '파이어메모리',
    '불꽃Z',
    '플라잉메모리',
    '비행Z',
    '고스트메모리',
    '고스트Z',
    '금왕관',
    '그래스메모리',
    '풀Z',
    '그래스시드',
    '그라운드메모리',
    '땅Z',
    '아이스메모리',
    'Ice Stone',
    '얼음Z',
    '어흥염Z',
    '짜랑고우거Z',
    '루나아라Z',
    '루가루암Z',
    '마샤도Z',
    '뮤Z',
    '따라큐Z',
    '미스트시드',
    '노말Z',
    '피카츄Z',
    '지우피카Z',
    '포이즌메모리',
    '독Z',
    '누리레느Z',
    '방호패드',
    '사이킥메모리',
    '사이코시드',
    '에스퍼Z',
    '록메모리',
    '바위Z',
    '잠만보Z',
    '솔가레오Z',
    '스틸메모리',
    '강철Z',
    '카푸Z',
    '그라운드코트',
    '울트라네크로Z',
    '워터메모리',
    '물Z',
]);
var SS = SM.concat([
    '베리사탕공예',
    '허탕보험',
    '이빠진포트',
    '네잎사탕공예',
    '깨진포트',
    '탈출팩',
    '꽃사탕공예',
    'Fossilized Bird',
    'Fossilized Dino',
    'Fossilized Drake',
    'Fossilized Fish',
    '가라두구팔찌',
    '가라두구머리장식',
    '통굽부츠',
    '대파',
    '하트사탕공예',
    '리본사탕공예',
    '룸서비스',
    '녹슨방패',
    '녹슨검',
    '스타사탕공예',
    '딸기사탕공예',
    '달콤한사과',
    '새콤한사과',
    '목스프레이',
]);
for (var i = 0; i < 100; i++) {
    SS.push("TR".concat(i < 10 ? "0".concat(i) : i));
}
SS.push('만능우산', 'Vile Vial');
SS.push.apply(SS, __spreadArray(__spreadArray([], __read(GSC_ONLY), false), ['Old Amber'], false));
var SV = SS.concat([
    '큰금강옥',
    'Auspicious Armor',
    '특성가드',
    '부스트에너지',
    '클리어참',
    '은밀망토',
    '속임수주사위',
    'Malicious Armor',
    '흉내허브',
    '펀치글러브',
    '큰백옥',
    '큰백금옥',
    'Strange Ball',
]);
var BERRIES = {
    '아바열매': { t: 'Dragon', p: 80 },
    '규살열매': { t: 'Ground', p: 100 },
    '배리열매': { t: 'Ice', p: 80 },
    '바리비열매': { t: 'Steel', p: 80 },
    '루베열매': { t: 'Electric', p: 100 },
    Berry: { t: 'Poison', p: 80 },
    '쓴맛나무열매': { t: 'Ground', p: 80 },
    '블리열매': { t: 'Fire', p: 90 },
    '불탄나무열매': { t: 'Ice', p: 80 },
    '루미열매': { t: 'Rock', p: 80 },
    '버치열매': { t: 'Fire', p: 80 },
    '유루열매': { t: 'Water', p: 80 },
    '카리열매': { t: 'Normal', p: 80 },
    '로플열매': { t: 'Fighting', p: 80 },
    '바코열매': { t: 'Flying', p: 80 },
    '마코열매': { t: 'Dark', p: 80 },
    '수숙열매': { t: 'Bug', p: 90 },
    '애슈열매': { t: 'Ghost', p: 100 },
    '두리열매': { t: 'Water', p: 100 },
    '의문열매': { t: 'Bug', p: 100 },
    '무화열매': { t: 'Bug', p: 80 },
    '용아열매': { t: 'Ice', p: 100 },
    '황금열매': { t: 'Psychic', p: 80 },
    '또뽀열매': { t: 'Flying', p: 90 },
    '하반열매': { t: 'Dragon', p: 80 },
    '로매열매': { t: 'Ground', p: 90 },
    '파야열매': { t: 'Dark', p: 80 },
    '얼은나무열매': { t: 'Grass', p: 80 },
    '자보열매': { t: 'Dragon', p: 100 },
    '수불열매': { t: 'Ghost', p: 80 },
    '으름열매': { t: 'Poison', p: 80 },
    '악키열매': { t: 'Fairy', p: 100 },
    '시마열매': { t: 'Fighting', p: 90 },
    '랑사열매': { t: 'Flying', p: 100 },
    '과사열매': { t: 'Fighting', p: 80 },
    '치리열매': { t: 'Grass', p: 100 },
    '리샘열매': { t: 'Flying', p: 80 },
    '마고열매': { t: 'Ghost', p: 80 },
    '고스티열매': { t: 'Rock', p: 90 },
    '타라프열매': { t: 'Dark', p: 100 },
    '미클열매': { t: 'Rock', p: 100 },
    '박하열매': { t: 'Water', p: 80 },
    '기적의열매': { t: 'Flying', p: 80 },
    '이상한나무열매': { t: 'Fighting', p: 80 },
    '나나열매': { t: 'Water', p: 90 },
    '노멜열매': { t: 'Dragon', p: 90 },
    '오카열매': { t: 'Fire', p: 80 },
    '오랭열매': { t: 'Poison', p: 80 },
    '자야열매': { t: 'Steel', p: 90 },
    '꼬시개열매': { t: 'Water', p: 80 },
    '야파열매': { t: 'Psychic', p: 80 },
    '복슝열매': { t: 'Electric', p: 80 },
    '시몬열매': { t: 'Ground', p: 80 },
    '야타비열매': { t: 'Poison', p: 100 },
    '파인열매': { t: 'Grass', p: 90 },
    '유석열매': { t: 'Ice', p: 90 },
    '마비치료제': { t: 'Fire', p: 80 },
    '마비치료제': { t: 'Electric', p: 80 },
    '파비열매': { t: 'Poison', p: 90 },
    '라부탐열매': { t: 'Ghost', p: 90 },
    '복분열매': { t: 'Grass', p: 80 },
    '라즈열매': { t: 'Steel', p: 80 },
    '린드열매': { t: 'Grass', p: 80 },
    '로셀열매': { t: 'Fairy', p: 80 },
    '애터열매': { t: 'Dark', p: 100 },
    '캄라열매': { t: 'Fighting', p: 100 },
    '슈캐열매': { t: 'Ground', p: 80 },
    '자뭉열매': { t: 'Psychic', p: 80 },
    '메호키열매': { t: 'Dark', p: 90 },
    '스타열매': { t: 'Psychic', p: 100 },
    '토망열매': { t: 'Psychic', p: 90 },
    '리체열매': { t: 'Bug', p: 80 },
    '초나열매': { t: 'Electric', p: 80 },
    '슈박열매': { t: 'Fire', p: 100 },
    '서배열매': { t: 'Electric', p: 90 },
    '위키열매': { t: 'Rock', p: 80 },
    '플카열매': { t: 'Ice', p: 80 }
};
exports.ITEMS = [[], RBY, GSC, ADV, DPP, BW, XY, SM, SS, SV];
var Items = (function () {
    function Items(gen) {
        this.gen = gen;
    }
    Items.prototype.get = function (id) {
        return ITEMS_BY_ID[this.gen][id];
    };
    Items.prototype[Symbol.iterator] = function () {
        var _a, _b, _c, _i, id;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = ITEMS_BY_ID[this.gen];
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3, 3];
                    id = _c;
                    return [4, this.get(id)];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    };
    return Items;
}());
exports.Items = Items;
var Item = (function () {
    function Item(name, gen) {
        this.kind = 'Item';
        this.id = (0, util_1.toID)(name);
        this.name = name;
        this.megaEvolves = exports.MEGA_STONES[name];
        var berry = BERRIES[name];
        if (berry) {
            this.isBerry = true;
            this.naturalGift = {
                basePower: gen < 6 ? berry.p - 20 : berry.p,
                type: berry.t
            };
        }
    }
    return Item;
}());
var ITEMS_BY_ID = [];
var gen = 0;
try {
    for (var ITEMS_1 = __values(exports.ITEMS), ITEMS_1_1 = ITEMS_1.next(); !ITEMS_1_1.done; ITEMS_1_1 = ITEMS_1.next()) {
        var items = ITEMS_1_1.value;
        var map = {};
        try {
            for (var items_1 = (e_2 = void 0, __values(items)), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                var i = new Item(item, gen);
                map[i.id] = i;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_b = items_1["return"])) _b.call(items_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        ITEMS_BY_ID.push(map);
        gen++;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (ITEMS_1_1 && !ITEMS_1_1.done && (_a = ITEMS_1["return"])) _a.call(ITEMS_1);
    }
    finally { if (e_1) throw e_1.error; }
}
//# sourceMappingURL=items.js.map