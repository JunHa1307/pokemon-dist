"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var e_1, _a;
exports.__esModule = true;

var util_1 = require("../util");
var RBY = {
    '???': {
        노말: 1,
        풀: 1,
        불꽃: 1,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 1,
        독: 1,
        땅: 1,
        바위: 1,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 1
    },
    노말: {
        '???': 1,
        노말: 1,
        풀: 1,
        불꽃: 1,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 1,
        독: 1,
        땅: 1,
        바위: 0.5,
        격투: 1,
        에스퍼: 1,
        고스트: 0,
        드래곤: 1
    },
    풀: {
        '???': 1,
        노말: 1,
        풀: 0.5,
        불꽃: 0.5,
        물: 2,
        전기: 1,
        얼음: 1,
        비행: 0.5,
        벌레: 0.5,
        독: 0.5,
        땅: 2,
        바위: 2,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 0.5
    },
    불꽃: {
        '???': 1,
        노말: 1,
        풀: 2,
        불꽃: 0.5,
        물: 0.5,
        전기: 1,
        얼음: 2,
        비행: 1,
        벌레: 2,
        독: 1,
        땅: 1,
        바위: 0.5,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 0.5
    },
    물: {
        '???': 1,
        노말: 1,
        풀: 0.5,
        불꽃: 2,
        물: 0.5,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 1,
        독: 1,
        땅: 2,
        바위: 2,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 0.5
    },
    전기: {
        '???': 1,
        노말: 1,
        풀: 0.5,
        불꽃: 1,
        물: 2,
        전기: 0.5,
        얼음: 1,
        비행: 2,
        벌레: 1,
        독: 1,
        땅: 0,
        바위: 1,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 0.5
    },
    얼음: {
        '???': 1,
        노말: 1,
        풀: 2,
        불꽃: 1,
        물: 0.5,
        전기: 1,
        얼음: 0.5,
        비행: 2,
        벌레: 1,
        독: 1,
        땅: 2,
        바위: 1,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 2
    },
    비행: {
        '???': 1,
        노말: 1,
        풀: 2,
        불꽃: 1,
        물: 1,
        전기: 0.5,
        얼음: 1,
        비행: 1,
        벌레: 2,
        독: 1,
        땅: 1,
        바위: 0.5,
        격투: 2,
        에스퍼: 1,
        고스트: 1,
        드래곤: 1
    },
    벌레: {
        '???': 1,
        노말: 1,
        풀: 2,
        불꽃: 0.5,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 0.5,
        벌레: 1,
        독: 2,
        땅: 1,
        바위: 1,
        격투: 0.5,
        에스퍼: 2,
        고스트: 0.5,
        드래곤: 1
    },
    독: {
        '???': 1,
        노말: 1,
        풀: 2,
        불꽃: 1,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 2,
        독: 0.5,
        땅: 0.5,
        바위: 0.5,
        격투: 1,
        에스퍼: 1,
        고스트: 0.5,
        드래곤: 1
    },
    땅: {
        '???': 1,
        노말: 1,
        풀: 0.5,
        불꽃: 2,
        물: 1,
        전기: 2,
        얼음: 1,
        비행: 0,
        벌레: 0.5,
        독: 2,
        땅: 1,
        바위: 2,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 1
    },
    바위: {
        '???': 1,
        노말: 1,
        풀: 1,
        불꽃: 2,
        물: 1,
        전기: 1,
        얼음: 2,
        비행: 2,
        벌레: 2,
        독: 1,
        땅: 0.5,
        바위: 1,
        격투: 0.5,
        에스퍼: 1,
        고스트: 1,
        드래곤: 1
    },
    격투: {
        '???': 1,
        노말: 2,
        풀: 1,
        불꽃: 1,
        물: 1,
        전기: 1,
        얼음: 2,
        비행: 0.5,
        벌레: 0.5,
        독: 0.5,
        땅: 1,
        바위: 2,
        격투: 1,
        에스퍼: 0.5,
        고스트: 0,
        드래곤: 1
    },
    에스퍼: {
        '???': 1,
        노말: 1,
        풀: 1,
        불꽃: 1,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 1,
        독: 2,
        땅: 1,
        바위: 1,
        격투: 2,
        에스퍼: 0.5,
        고스트: 1,
        드래곤: 1
    },
    고스트: {
        '???': 1,
        노말: 0,
        풀: 1,
        불꽃: 1,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 1,
        독: 1,
        땅: 1,
        바위: 1,
        격투: 1,
        에스퍼: 0,
        고스트: 2,
        드래곤: 1
    },
    드래곤: {
        '???': 1,
        노말: 1,
        풀: 1,
        불꽃: 1,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 1,
        독: 1,
        땅: 1,
        바위: 1,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 2
    }
};
var GSC = (0, util_1.extend)(true, {}, RBY, {
    '???': { 악: 1, 강철: 1 },
    노말: { 악: 1, 강철: 0.5 },
    풀: { 악: 1, 강철: 0.5 },
    불꽃: { 악: 1, 강철: 2 },
    물: { 악: 1, 강철: 1 },
    전기: { 악: 1, 강철: 1 },
    얼음: { 불꽃: 0.5, 악: 1, 강철: 0.5 },
    비행: { 악: 1, 강철: 0.5 },
    벌레: { 독: 0.5, 악: 2, 강철: 0.5 },
    독: { 벌레: 1, 악: 1, 강철: 0 },
    땅: { 악: 1, 강철: 2 },
    바위: { 악: 1, 강철: 0.5 },
    격투: { 악: 2, 강철: 2 },
    에스퍼: { 악: 0, 강철: 0.5 },
    고스트: { 에스퍼: 2, 악: 0.5, 강철: 0.5 },
    드래곤: { 악: 1, 강철: 0.5 },
    악: {
        '???': 1,
        노말: 1,
        풀: 1,
        불꽃: 1,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 1,
        독: 1,
        땅: 1,
        바위: 1,
        격투: 0.5,
        에스퍼: 2,
        고스트: 2,
        드래곤: 1,
        악: 0.5,
        강철: 0.5
    },
    강철: {
        '???': 1,
        노말: 1,
        풀: 1,
        불꽃: 0.5,
        물: 0.5,
        전기: 0.5,
        얼음: 2,
        비행: 1,
        벌레: 1,
        독: 1,
        땅: 1,
        바위: 2,
        격투: 1,
        에스퍼: 1,
        고스트: 1,
        드래곤: 1,
        악: 1,
        강철: 0.5
    }
});
var ADV = GSC;
var DPP = GSC;
var BW = GSC;
var XY = (0, util_1.extend)(true, {}, GSC, {
    '???': { 페어리: 1 },
    노말: { 페어리: 1 },
    풀: { 페어리: 1 },
    불꽃: { 페어리: 1 },
    물: { 페어리: 1 },
    전기: { 페어리: 1 },
    얼음: { 페어리: 1 },
    비행: { 페어리: 1 },
    벌레: { 페어리: 0.5 },
    독: { 페어리: 2 },
    땅: { 페어리: 1 },
    바위: { 페어리: 1 },
    격투: { 페어리: 0.5 },
    에스퍼: { 페어리: 1 },
    고스트: { 강철: 1, 페어리: 1 },
    드래곤: { 페어리: 0 },
    악: { 강철: 1, 페어리: 0.5 },
    강철: { 페어리: 2 },
    페어리: {
        '???': 1,
        노말: 1,
        풀: 1,
        불꽃: 0.5,
        물: 1,
        전기: 1,
        얼음: 1,
        비행: 1,
        벌레: 1,
        독: 0.5,
        땅: 1,
        바위: 1,
        격투: 2,
        에스퍼: 1,
        고스트: 1,
        드래곤: 2,
        악: 2,
        강철: 0.5,
        페어리: 1
    }
});
var SM = XY;
var SS = SM;
var SV = SS;
exports.TYPE_CHART = [{}, RBY, GSC, ADV, DPP, BW, XY, SM, SS, SV];
var Types = (function () {
    function Types(gen) {
        this.gen = gen;
    }
    Types.prototype.get = function (id) {
        return TYPES_BY_ID[this.gen][id];
    };
    Types.prototype[Symbol.iterator] = function () {
        var _a, _b, _c, _i, id;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = TYPES_BY_ID[this.gen];
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
    return Types;
}());
exports.Types = Types;
var Type = (function () {
    function Type(name, effectiveness) {
        this.kind = 'Type';
        this.id = (0, util_1.toID)(name);
        this.name = name;
        this.effectiveness = effectiveness;
    }
    return Type;
}());
var TYPES_BY_ID = [];
try {
    for (var TYPE_CHART_1 = __values(exports.TYPE_CHART), TYPE_CHART_1_1 = TYPE_CHART_1.next(); !TYPE_CHART_1_1.done; TYPE_CHART_1_1 = TYPE_CHART_1.next()) {
        var typeChart = TYPE_CHART_1_1.value;
        var map = {};
        for (var type in typeChart) {
            var t = new Type(type, __assign({}, typeChart[type]));
            map[t.id] = t;
        }
        TYPES_BY_ID.push(map);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (TYPE_CHART_1_1 && !TYPE_CHART_1_1.done && (_a = TYPE_CHART_1["return"])) _a.call(TYPE_CHART_1);
    }
    finally { if (e_1) throw e_1.error; }
}
//# sourceMappingURL=types.js.map