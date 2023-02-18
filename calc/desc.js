"use strict";
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
exports.__esModule = true;

var result_1 = require("./result");
var util_1 = require("./util");
var util_2 = require("./mechanics/util");
function display(gen, attacker, defender, move, field, damage, rawDesc, notation, err) {
    if (notation === void 0) { notation = '%'; }
    if (err === void 0) { err = true; }
    var _a = __read((0, result_1.damageRange)(damage), 2), minDamage = _a[0], maxDamage = _a[1];
    var min = (typeof minDamage === 'number' ? minDamage : minDamage[0] + minDamage[1]) * move.hits;
    var max = (typeof maxDamage === 'number' ? maxDamage : maxDamage[0] + maxDamage[1]) * move.hits;
    var minDisplay = toDisplay(notation, min, defender.maxHP());
    var maxDisplay = toDisplay(notation, max, defender.maxHP());
    var desc = buildDescription(rawDesc, attacker, defender);
    var damageText = "".concat(min, "-").concat(max, " (").concat(minDisplay, " - ").concat(maxDisplay).concat(notation, ")");
    if (move.category === 'Status' && !move.named('Nature Power'))
        return "".concat(desc, ": ").concat(damageText);
    var koChanceText = getKOChance(gen, attacker, defender, move, field, damage, err).text;
    return koChanceText ? "".concat(desc, ": ").concat(damageText, " -- ").concat(koChanceText) : "".concat(desc, ": ").concat(damageText);
}
exports.display = display;
function displayMove(gen, attacker, defender, move, damage, notation) {
    if (notation === void 0) { notation = '%'; }
    var _a = __read((0, result_1.damageRange)(damage), 2), minDamage = _a[0], maxDamage = _a[1];
    var min = (typeof minDamage === 'number' ? minDamage : minDamage[0] + minDamage[1]) * move.hits;
    var max = (typeof maxDamage === 'number' ? maxDamage : maxDamage[0] + maxDamage[1]) * move.hits;
    var minDisplay = toDisplay(notation, min, defender.maxHP());
    var maxDisplay = toDisplay(notation, max, defender.maxHP());
    var recoveryText = getRecovery(gen, attacker, defender, move, damage, notation).text;
    var recoilText = getRecoil(gen, attacker, defender, move, damage, notation).text;
    return "".concat(minDisplay, " - ").concat(maxDisplay).concat(notation).concat(recoveryText &&
        " (".concat(recoveryText, ")")).concat(recoilText && " (".concat(recoilText, ")"));
}
exports.displayMove = displayMove;
function getRecovery(gen, attacker, defender, move, damage, notation) {
    if (notation === void 0) { notation = '%'; }
    var _a = __read((0, result_1.damageRange)(damage), 2), minDamage = _a[0], maxDamage = _a[1];
    var minD = typeof minDamage === 'number' ? [minDamage] : minDamage;
    var maxD = typeof maxDamage === 'number' ? [maxDamage] : maxDamage;
    var recovery = [0, 0];
    var text = '';
    var ignoresShellBell = gen.num === 3 && move.named('Doom Desire', 'Future Sight');
    if (attacker.hasItem('조개껍질방울') && !ignoresShellBell) {
        var max = Math.round(defender.maxHP() / 8);
        for (var i = 0; i < minD.length; i++) {
            recovery[0] += Math.min(Math.round(minD[i] * move.hits / 8), max);
            recovery[1] += Math.min(Math.round(maxD[i] * move.hits / 8), max);
        }
    }
    if (move.named('G-Max Finale')) {
        recovery[0] = recovery[1] = Math.round(attacker.maxHP() / 6);
    }
    if (move.drain) {
        var percentHealed = move.drain[0] / move.drain[1];
        var max = Math.round(defender.maxHP() * percentHealed);
        for (var i = 0; i < minD.length; i++) {
            var range = [minD[i], maxD[i]];
            for (var j in recovery) {
                var drained = Math.round(range[j] * percentHealed);
                if (attacker.hasItem('큰뿌리'))
                    drained = Math.trunc(drained * 5324 / 4096);
                recovery[j] += Math.min(drained * move.hits, max);
            }
        }
    }
    if (recovery[1] === 0)
        return { recovery: recovery, text: text };
    var minHealthRecovered = toDisplay(notation, recovery[0], attacker.maxHP());
    var maxHealthRecovered = toDisplay(notation, recovery[1], attacker.maxHP());
    text = "".concat(minHealthRecovered, " - ").concat(maxHealthRecovered).concat(notation, " 회복가능");
    return { recovery: recovery, text: text };
}
exports.getRecovery = getRecovery;
function getRecoil(gen, attacker, defender, move, damage, notation) {
    if (notation === void 0) { notation = '%'; }
    var _a = __read((0, result_1.damageRange)(damage), 2), minDamage = _a[0], maxDamage = _a[1];
    var min = (typeof minDamage === 'number' ? minDamage : minDamage[0] + minDamage[1]) * move.hits;
    var max = (typeof maxDamage === 'number' ? maxDamage : maxDamage[0] + maxDamage[1]) * move.hits;
    var recoil = [0, 0];
    var text = '';
    var damageOverflow = minDamage > defender.curHP() || maxDamage > defender.curHP();
    if (move.recoil) {
        var mod = (move.recoil[0] / move.recoil[1]) * 100;
        var minRecoilDamage = void 0, maxRecoilDamage = void 0;
        if (damageOverflow) {
            minRecoilDamage =
                toDisplay(notation, defender.curHP() * mod, attacker.maxHP(), 100);
            maxRecoilDamage =
                toDisplay(notation, defender.curHP() * mod, attacker.maxHP(), 100);
        }
        else {
            minRecoilDamage = toDisplay(notation, Math.min(min, defender.curHP()) * mod, attacker.maxHP(), 100);
            maxRecoilDamage = toDisplay(notation, Math.min(max, defender.curHP()) * mod, attacker.maxHP(), 100);
        }
        if (!attacker.hasAbility('Rock Head')) {
            recoil = [minRecoilDamage, maxRecoilDamage];
            text = "".concat(minRecoilDamage, " - ").concat(maxRecoilDamage).concat(notation, " 반동 대미지");
        }
    }
    else if (move.hasCrashDamage) {
        var genMultiplier = gen.num === 2 ? 12.5 : gen.num >= 3 ? 50 : 1;
        var minRecoilDamage = void 0, maxRecoilDamage = void 0;
        if (damageOverflow && gen.num !== 2) {
            minRecoilDamage =
                toDisplay(notation, defender.curHP() * genMultiplier, attacker.maxHP(), 100);
            maxRecoilDamage =
                toDisplay(notation, defender.curHP() * genMultiplier, attacker.maxHP(), 100);
        }
        else {
            minRecoilDamage = toDisplay(notation, Math.min(min, defender.maxHP()) * genMultiplier, attacker.maxHP(), 100);
            maxRecoilDamage = toDisplay(notation, Math.min(max, defender.maxHP()) * genMultiplier, attacker.maxHP(), 100);
        }
        recoil = [minRecoilDamage, maxRecoilDamage];
        switch (gen.num) {
            case 1:
                recoil = toDisplay(notation, 1, attacker.maxHP());
                text = '1hp damage on miss';
                break;
            case 2:
            case 3:
            case 4:
                if (defender.hasType('Ghost')) {
                    if (gen.num === 4) {
                        var gen4CrashDamage = Math.floor(((defender.maxHP() * 0.5) / attacker.maxHP()) * 100);
                        recoil = notation === '%' ? gen4CrashDamage : Math.floor((gen4CrashDamage / 100) * 48);
                        text = "".concat(gen4CrashDamage, "% 반동 대미지");
                    }
                    else {
                        recoil = 0;
                        text = '고스트타입에는 반동대미지 없음';
                    }
                }
                else {
                    text = "".concat(minRecoilDamage, " - ").concat(maxRecoilDamage).concat(notation, "감나빗 반동 대미지");
                }
                break;
            default:
                recoil = notation === '%' ? 24 : 50;
                text = '50% 반동 대미지';
        }
    }
    else if (move.struggleRecoil) {
        recoil = notation === '%' ? 12 : 25;
        text = '25% 발버둥 대미지';
        if (gen.num === 4)
            text += ' (rounded down)';
    }
    else if (move.mindBlownRecoil) {
        recoil = notation === '%' ? 24 : 50;
        text = '50% 반동 대미지';
    }
    return { recoil: recoil, text: text };
}
exports.getRecoil = getRecoil;
function getKOChance(gen, attacker, defender, move, field, damage, err) {
    if (err === void 0) { err = true; }
    damage = combine(damage);
    if (isNaN(damage[0])) {
        (0, util_1.error)(err, 'damage[0] must be a number.');
        return { chance: 0, n: 0, text: '' };
    }
    if (damage[damage.length - 1] === 0) {
        (0, util_1.error)(err, 'damage[damage.length - 1] === 0.');
        return { chance: 0, n: 0, text: '' };
    }
    if (move.timesUsed === undefined)
        move.timesUsed = 1;
    if (move.timesUsedWithMetronome === undefined)
        move.timesUsedWithMetronome = 1;
    if (damage[0] >= defender.maxHP() && move.timesUsed === 1 && move.timesUsedWithMetronome === 1) {
        return { chance: 1, n: 1, text: '확정 1타!!' };
    }
    var hazards = getHazards(gen, defender, field.defenderSide);
    var eot = getEndOfTurn(gen, attacker, defender, move, field);
    var toxicCounter = defender.hasStatus('tox') && !defender.hasAbility('Magic Guard') ? defender.toxicCounter : 0;
    var qualifier = '';
    if (move.hits > 1) {
        qualifier = '약 ';
        damage = squashMultihit(gen, damage, move.hits, err);
    }
    var hazardsText = hazards.texts.length > 0
        ? ' ( ' + serializeText(hazards.texts) + ' ) '
        : '';
    var afterText = hazards.texts.length > 0 || eot.texts.length > 0
        ? ' ( ' + serializeText(hazards.texts.concat(eot.texts)) + ' ) '
        : '';
    if ((move.timesUsed === 1 && move.timesUsedWithMetronome === 1) || move.isZ) {
        var chance = computeKOChance(damage, defender.curHP() - hazards.damage, 0, 1, 1, defender.maxHP(), toxicCounter);
        if (chance === 1) {
            return { chance: chance, n: 1, text: "확정 1타!!".concat(hazardsText) };
        }
        else if (chance > 0) {
            return {
                chance: chance,
                n: 1,
                text: qualifier + Math.round(chance * 1000) / 10 + "% 난수 1타".concat(hazardsText)
            };
        }
        if (damage.length === 256) {
            qualifier = '약 ';
        }
        for (var i = 2; i <= 4; i++) {
            var chance_1 = computeKOChance(damage, defender.curHP() - hazards.damage, eot.damage, i, 1, defender.maxHP(), toxicCounter);
            if (chance_1 === 1) {
                return { chance: chance_1, n: i, text: "".concat(qualifier || '확정 ').concat(i, "타").concat(afterText) };
            }
            else if (chance_1 > 0) {
                return {
                    chance: chance_1,
                    n: i,
                    text: qualifier + Math.round(chance_1 * 1000) / 10 + "% 난수 ".concat(i, "타").concat(afterText)
                };
            }
        }
        for (var i = 5; i <= 9; i++) {
            if (predictTotal(damage[0], eot.damage, i, 1, toxicCounter, defender.maxHP()) >=
                defender.curHP() - hazards.damage) {
                return { chance: 1, n: i, text: "".concat(qualifier || '확정 ').concat(i, "타").concat(afterText) };
            }
            else if (predictTotal(damage[damage.length - 1], eot.damage, i, 1, toxicCounter, defender.maxHP()) >=
                defender.curHP() - hazards.damage) {
                return { n: i, text: qualifier + "".concat(i, "타 가능성 있음").concat(afterText) };
            }
        }
    }
    else {
        var chance = computeKOChance(damage, defender.maxHP() - hazards.damage, eot.damage, move.hits || 1, move.timesUsed || 1, defender.maxHP(), toxicCounter);
        if (chance === 1) {
            return {
                chance: chance,
                n: move.timesUsed,
                text: "".concat(move.timesUsed, " 턴 내 ").concat(qualifier || '확정 ', "1타 ").concat(afterText)
            };
        }
        else if (chance > 0) {
            return {
                chance: chance,
                n: move.timesUsed,
                text: qualifier +
                    Math.round(chance * 1000) / 10 +
                    "% 난수 ".concat(move.timesUsed, "타").concat(afterText)
            };
        }
        if (predictTotal(damage[0], eot.damage, move.hits, move.timesUsed, toxicCounter, defender.maxHP()) >=
            defender.curHP() - hazards.damage) {
            return {
                chance: 1,
                n: move.timesUsed,
                text: "".concat(move.timesUsed, " 턴 안에").concat(qualifier || '확정 ', "1타 ").concat(afterText)
            };
        }
        else if (predictTotal(damage[damage.length - 1], eot.damage, move.hits, move.timesUsed, toxicCounter, defender.maxHP()) >=
            defender.curHP() - hazards.damage) {
            return {
                n: move.timesUsed,
                text: qualifier + "".concat(move.timesUsed, " turns")+"턴 안에 쓰러질 가능성 있음".concat(afterText)
            };
        }
        return { n: move.timesUsed, text: qualifier + '1타 불가' };
    }
    return { chance: 0, n: 0, text: '' };
}
exports.getKOChance = getKOChance;
function combine(damage) {
    if (typeof damage === 'number')
        return [damage];
    if (damage.length > 2) {
        if (damage[0] > damage[damage.length - 1])
            damage = damage.slice().sort();
        return damage;
    }
    if (typeof damage[0] === 'number' && typeof damage[1] === 'number') {
        return [damage[0] + damage[1]];
    }
    var d = damage;
    var combined = [];
    for (var i = 0; i < d[0].length; i++) {
        for (var j = 0; j < d[1].length; j++) {
            combined.push(d[0][i] + d[1][j]);
        }
    }
    return combined.sort();
}
var TRAPPING = [
    'Bind', 'Clamp', 'Fire Spin', 'Infestation', 'Magma Storm', 'Sand Tomb',
    'Thunder Cage', 'Whirlpool', 'Wrap', 'G-Max Sandblast', 'G-Max Centiferno',
];
function getHazards(gen, defender, defenderSide) {
    var damage = 0;
    var texts = [];
    if (defender.hasItem('통굽부츠')) {
        return { damage: damage, texts: texts };
    }
    if (defenderSide.isSR && !defender.hasAbility('Magic Guard', 'Mountaineer')) {
        var rockType = gen.types.get('rock');
        var effectiveness = rockType.effectiveness[defender.types[0]] *
            (defender.types[1] ? rockType.effectiveness[defender.types[1]] : 1);
        damage += Math.floor((effectiveness * defender.maxHP()) / 8);
        texts.push('스텔스락');
    }
    if (defenderSide.steelsurge && !defender.hasAbility('Magic Guard', 'Mountaineer')) {
        var steelType = gen.types.get('steel');
        var effectiveness = steelType.effectiveness[defender.types[0]] *
            (defender.types[1] ? steelType.effectiveness[defender.types[1]] : 1);
        damage += Math.floor((effectiveness * defender.maxHP()) / 8);
        texts.push('Steelsurge');
    }
    if (!defender.hasType('Flying') &&
        !defender.hasAbility('Magic Guard', 'Levitate') &&
        !defender.hasItem('풍선')) {
        if (defenderSide.spikes === 1) {
            damage += Math.floor(defender.maxHP() / 8);
            if (gen.num === 2) {
                texts.push('Spikes');
            }
            else {
                texts.push('압정 1번 대미지');
            }
        }
        else if (defenderSide.spikes === 2) {
            damage += Math.floor(defender.maxHP() / 6);
            texts.push('압정 2번 대미지');
        }
        else if (defenderSide.spikes === 3) {
            damage += Math.floor(defender.maxHP() / 4);
            texts.push('압정 3번 대미지');
        }
    }
    if (isNaN(damage)) {
        damage = 0;
    }
    return { damage: damage, texts: texts };
}
function getEndOfTurn(gen, attacker, defender, move, field) {
    var damage = 0;
    var texts = [];
    if (field.hasWeather('Sun', 'Harsh Sunshine')) {
        if (defender.hasAbility('Dry Skin', 'Solar Power')) {
            damage -= Math.floor(defender.maxHP() / 8);
            texts.push(abilityKR[defender.ability] + ' 대미지');
        }
    }
    else if (field.hasWeather('Rain', 'Heavy Rain')) {
        if (defender.hasAbility('Dry Skin')) {
            damage += Math.floor(defender.maxHP() / 8);
            texts.push('건조 피부 회복');
        }
        else if (defender.hasAbility('Rain Dish')) {
            damage += Math.floor(defender.maxHP() / 16);
            texts.push('젖은 접시 회복');
        }
    }
    else if (field.hasWeather('Sand')) {
        if (!defender.hasType('Rock', 'Ground', 'Steel') &&
            !defender.hasAbility('Magic Guard', 'Overcoat', 'Sand Force', 'Sand Rush', 'Sand Veil') &&
            !defender.hasItem('방진고글')) {
            damage -= Math.floor(defender.maxHP() / (gen.num === 2 ? 8 : 16));
            texts.push('모래바람 대미지');
        }
    }
    else if (field.hasWeather('Hail', 'Snow')) {
        if (defender.hasAbility('Ice Body')) {
            damage += Math.floor(defender.maxHP() / 16);
            texts.push('아이스 바디 회복');
        }
        else if (!defender.hasType('Ice') &&
            !defender.hasAbility('Magic Guard', 'Overcoat', 'Snow Cloak') &&
            !defender.hasItem('방진고글') &&
            field.hasWeather('Hail')) {
            damage -= Math.floor(defender.maxHP() / 16);
            texts.push('싸라기눈 대미지');
        }
    }
    var loseItem = move.named('Knock Off') && !defender.hasAbility('Sticky Hold');
    if (defender.hasItem('먹다남은음식') && !loseItem) {
        damage += Math.floor(defender.maxHP() / 16);
        texts.push('먹다남은음식 회복');
    }
    else if (defender.hasItem('검은오물') && !loseItem) {
        if (defender.hasType('Poison')) {
            damage += Math.floor(defender.maxHP() / 16);
            texts.push('검은오물 회복');
        }
        else if (!defender.hasAbility('Magic Guard', 'Klutz')) {
            damage -= Math.floor(defender.maxHP() / 8);
            texts.push('검은오물 대미지');
        }
    }
    else if (defender.hasItem('끈적끈적바늘')) {
        damage -= Math.floor(defender.maxHP() / 8);
        texts.push('끈적끈적바늘 대미지');
    }
    if (field.defenderSide.isSeeded) {
        if (!defender.hasAbility('Magic Guard')) {
            damage -= Math.floor(defender.maxHP() / (gen.num >= 2 ? 8 : 16));
            texts.push('씨뿌리기 대미지');
        }
    }
    if (field.attackerSide.isSeeded && !attacker.hasAbility('Magic Guard')) {
        var recovery = Math.floor(attacker.maxHP() / (gen.num >= 2 ? 8 : 16));
        if (defender.hasItem('큰뿌리'))
            recovery = Math.trunc(recovery * 5324 / 4096);
        if (attacker.hasAbility('Liquid Ooze')) {
            damage -= recovery;
            texts.push('해감액 대미지');
        }
        else {
            damage += recovery;
            texts.push('씨뿌리기 회복');
        }
    }
    if (field.hasTerrain('Grassy')) {
        if ((0, util_2.isGrounded)(defender, field)) {
            damage += Math.floor(defender.maxHP() / 16);
            texts.push('그래스필드 회복');
        }
    }
    if (defender.hasStatus('psn')) {
        if (defender.hasAbility('Poison Heal')) {
            damage += Math.floor(defender.maxHP() / 8);
            texts.push('포이즌 힐');
        }
        else if (!defender.hasAbility('Magic Guard')) {
            damage -= Math.floor(defender.maxHP() / (gen.num === 1 ? 16 : 8));
            texts.push('독 대미지');
        }
    }
    else if (defender.hasStatus('tox')) {
        if (defender.hasAbility('Poison Heal')) {
            damage += Math.floor(defender.maxHP() / 8);
            texts.push('포이즌 힐');
        }
        else if (!defender.hasAbility('Magic Guard')) {
            texts.push('맹독 대미지');
        }
    }
    else if (defender.hasStatus('brn')) {
        if (defender.hasAbility('Heatproof')) {
            damage -= Math.floor(defender.maxHP() / (gen.num > 6 ? 32 : 16));
            texts.push('화상대미지 반감');
        }
        else if (!defender.hasAbility('Magic Guard')) {
            damage -= Math.floor(defender.maxHP() / (gen.num === 1 || gen.num > 6 ? 16 : 8));
            texts.push('화상 대미지');
        }
    }
    else if ((defender.hasStatus('slp') || defender.hasAbility('Comatose')) &&
        attacker.hasAbility('isBadDreams') &&
        !defender.hasAbility('Magic Guard')) {
        damage -= Math.floor(defender.maxHP() / 8);
        texts.push('악몽');
    }
    if (!defender.hasAbility('Magic Guard') && TRAPPING.includes(move.name)) {
        if (attacker.hasItem('조임밴드')) {
            damage -= gen.num > 5 ? Math.floor(defender.maxHP() / 6) : Math.floor(defender.maxHP() / 8);
            texts.push('조이기 대미지');
        }
        else {
            damage -= gen.num > 5 ? Math.floor(defender.maxHP() / 8) : Math.floor(defender.maxHP() / 16);
            texts.push('조이기 대미지');
        }
    }
    if (defender.isSaltCure && !defender.hasAbility('Magic Guard')) {
        var isWaterOrSteel = defender.hasType('Water', 'Steel') ||
            (defender.teraType && ['Water', 'Steel'].includes(defender.teraType));
        damage -= Math.floor(defender.maxHP() / (isWaterOrSteel ? 4 : 8));
        texts.push('소금절이');
    }
    if (!defender.hasType('Fire') && !defender.hasAbility('Magic Guard') &&
        (move.named('Fire Pledge (Grass Pledge Boosted)', 'Grass Pledge (Fire Pledge Boosted)'))) {
        damage -= Math.floor(defender.maxHP() / 8);
        texts.push('불바다 damage');
    }
    if (!defender.hasAbility('Magic Guard') && !defender.hasType('Grass') &&
        (field.defenderSide.vinelash || move.named('G-Max Vine Lash'))) {
        damage -= Math.floor(defender.maxHP() / 6);
        texts.push('거다이편달 대미지');
    }
    if (!defender.hasAbility('Magic Guard') && !defender.hasType('Fire') &&
        (field.defenderSide.wildfire || move.named('G-Max Wildfire'))) {
        damage -= Math.floor(defender.maxHP() / 6);
        texts.push('거다이옥염 대미지');
    }
    if (!defender.hasAbility('Magic Guard') && !defender.hasType('Water') &&
        (field.defenderSide.cannonade || move.named('G-Max Cannonade'))) {
        damage -= Math.floor(defender.maxHP() / 6);
        texts.push('거다이포격 damage');
    }
    if (!defender.hasAbility('Magic Guard') && !defender.hasType('Rock') &&
        (field.defenderSide.volcalith || move.named('G-Max Volcalith'))) {
        damage -= Math.floor(defender.maxHP() / 6);
        texts.push('거다이분석 damage');
    }
    return { damage: damage, texts: texts };
}
function computeKOChance(damage, hp, eot, hits, timesUsed, maxHP, toxicCounter) {
    var n = damage.length;
    if (hits === 1) {
        for (var i = 0; i < n; i++) {
            if (damage[n - 1] < hp)
                return 0;
            if (damage[i] >= hp) {
                return (n - i) / n;
            }
        }
    }
    var toxicDamage = 0;
    if (toxicCounter > 0) {
        toxicDamage = Math.floor((toxicCounter * maxHP) / 16);
        toxicCounter++;
    }
    var sum = 0;
    var lastc = 0;
    for (var i = 0; i < n; i++) {
        var c = void 0;
        if (i === 0 || damage[i] !== damage[i - 1]) {
            c = computeKOChance(damage, hp - damage[i] + eot - toxicDamage, eot, hits - 1, timesUsed, maxHP, toxicCounter);
        }
        else {
            c = lastc;
        }
        if (c === 1) {
            sum += n - i;
            break;
        }
        else {
            sum += c;
        }
        lastc = c;
    }
    return sum / n;
}
function predictTotal(damage, eot, hits, timesUsed, toxicCounter, maxHP) {
    var toxicDamage = 0;
    if (toxicCounter > 0) {
        for (var i = 0; i < hits - 1; i++) {
            toxicDamage += Math.floor(((toxicCounter + i) * maxHP) / 16);
        }
    }
    var total = 0;
    if (hits > 1 && timesUsed === 1) {
        total = damage * hits - eot * (hits - 1) + toxicDamage;
    }
    else {
        total = damage - eot * (hits - 1) + toxicDamage;
    }
    return total;
}
function squashMultihit(gen, d, hits, err) {
    if (err === void 0) { err = true; }
    if (d.length === 1) {
        return [d[0] * hits];
    }
    else if (gen.num === 1) {
        var r = [];
        for (var i = 0; i < d.length; i++) {
            r[i] = d[i] * hits;
        }
        return r;
    }
    else if (d.length === 16) {
        switch (hits) {
            case 2:
                return [
                    2 * d[0], d[2] + d[3], d[4] + d[4], d[4] + d[5], d[5] + d[6], d[6] + d[6],
                    d[6] + d[7], d[7] + d[7], d[8] + d[8], d[8] + d[9], d[9] + d[9], d[9] + d[10],
                    d[10] + d[11], d[11] + d[11], d[12] + d[13], 2 * d[15],
                ];
            case 3:
                return [
                    3 * d[0], d[3] + d[3] + d[4], d[4] + d[4] + d[5], d[5] + d[5] + d[6],
                    d[5] + d[6] + d[6], d[6] + d[6] + d[7], d[6] + d[7] + d[7], d[7] + d[7] + d[8],
                    d[7] + d[8] + d[8], d[8] + d[8] + d[9], d[8] + d[9] + d[9], d[9] + d[9] + d[10],
                    d[9] + d[10] + d[10], d[10] + d[11] + d[11], d[11] + d[12] + d[12], 3 * d[15],
                ];
            case 4:
                return [
                    4 * d[0], 4 * d[4], d[4] + d[5] + d[5] + d[5], d[5] + d[5] + d[6] + d[6],
                    4 * d[6], d[6] + d[6] + d[7] + d[7], 4 * d[7], d[7] + d[7] + d[7] + d[8],
                    d[7] + d[8] + d[8] + d[8], 4 * d[8], d[8] + d[8] + d[9] + d[9], 4 * d[9],
                    d[9] + d[9] + d[10] + d[10], d[10] + d[10] + d[10] + d[11], 4 * d[11], 4 * d[15],
                ];
            case 5:
                return [
                    5 * d[0], d[4] + d[4] + d[4] + d[5] + d[5], d[5] + d[5] + d[5] + d[5] + d[6],
                    d[5] + d[6] + d[6] + d[6] + d[6], d[6] + d[6] + d[6] + d[6] + d[7],
                    d[6] + d[6] + d[7] + d[7] + d[7], 5 * d[7], d[7] + d[7] + d[7] + d[8] + d[8],
                    d[7] + d[7] + d[8] + d[8] + d[8], 5 * d[8], d[8] + d[8] + d[8] + d[9] + d[9],
                    d[8] + d[9] + d[9] + d[9] + d[9], d[9] + d[9] + d[9] + d[9] + d[10],
                    d[9] + d[10] + d[10] + d[10] + d[10], d[10] + d[10] + d[11] + d[11] + d[11], 5 * d[15],
                ];
            case 10:
                return [
                    10 * d[0], 10 * d[4], 3 * d[4] + 7 * d[5], 5 * d[5] + 5 * d[6], 10 * d[6],
                    5 * d[6] + 5 * d[7], 10 * d[7], 7 * d[7] + 3 * d[8], 3 * d[7] + 7 * d[8], 10 * d[8],
                    5 * d[8] + 5 * d[9], 4 * d[9], 5 * d[9] + 5 * d[10], 7 * d[10] + 3 * d[11], 10 * d[11],
                    10 * d[15],
                ];
            default:
                (0, util_1.error)(err, "Unexpected # of hits: ".concat(hits));
                return d;
        }
    }
    else if (d.length === 39) {
        switch (hits) {
            case 2:
                return [
                    2 * d[0], 2 * d[7], 2 * d[10], 2 * d[12], 2 * d[14], d[15] + d[16],
                    2 * d[17], d[18] + d[19], d[19] + d[20], 2 * d[21], d[22] + d[23],
                    2 * d[24], 2 * d[26], 2 * d[28], 2 * d[31], 2 * d[38],
                ];
            case 3:
                return [
                    3 * d[0], 3 * d[9], 3 * d[12], 3 * d[13], 3 * d[15], 3 * d[16],
                    3 * d[17], 3 * d[18], 3 * d[20], 3 * d[21], 3 * d[22], 3 * d[23],
                    3 * d[25], 3 * d[26], 3 * d[29], 3 * d[38],
                ];
            case 4:
                return [
                    4 * d[0], 2 * d[10] + 2 * d[11], 4 * d[13], 4 * d[14], 2 * d[15] + 2 * d[16],
                    2 * d[16] + 2 * d[17], 2 * d[17] + 2 * d[18], 2 * d[18] + 2 * d[19],
                    2 * d[19] + 2 * d[20], 2 * d[20] + 2 * d[21], 2 * d[21] + 2 * d[22],
                    2 * d[22] + 2 * d[23], 4 * d[24], 4 * d[25], 2 * d[27] + 2 * d[28], 4 * d[38],
                ];
            case 5:
                return [
                    5 * d[0], 5 * d[11], 5 * d[13], 5 * d[15], 5 * d[16], 5 * d[17],
                    5 * d[18], 5 * d[19], 5 * d[19], 5 * d[20], 5 * d[21], 5 * d[22],
                    5 * d[23], 5 * d[25], 5 * d[27], 5 * d[38],
                ];
            case 10:
                return [
                    10 * d[0], 10 * d[11], 10 * d[13], 10 * d[15], 10 * d[16], 10 * d[17],
                    10 * d[18], 10 * d[19], 10 * d[19], 10 * d[20], 10 * d[21], 10 * d[22],
                    10 * d[23], 10 * d[25], 10 * d[27], 10 * d[38],
                ];
            default:
                (0, util_1.error)(err, "Unexpected # of hits: ".concat(hits));
                return d;
        }
    }
    else if (d.length === 256) {
        if (hits > 1) {
            (0, util_1.error)(err, "Unexpected # of hits for Parental Bond: ".concat(hits));
        }
        var r = [];
        for (var i = 0; i < 16; i++) {
            var val = 0;
            for (var j = 0; j < 16; j++) {
                val += d[i + j];
            }
            r[i] = Math.round(val / 16);
        }
        return r;
    }
    else {
        (0, util_1.error)(err, "Unexpected # of possible damage values: ".concat(d.length));
        return d;
    }
}
function buildDescription(description, attacker, defender) {
    var _a = __read(getDescriptionLevels(attacker, defender), 2), attackerLevel = _a[0], defenderLevel = _a[1];
    var output = '';
    if (description.attackBoost) {
        if (description.attackBoost > 0) {
            output += '+';
        }
        output += description.attackBoost + ' ';
    }
    output = appendIfSet(output, attackerLevel);
    output = appendIfSet(output, description.attackEVs);
    output = appendIfSet(output, description.attackerItem);
    output = appendIfSet(output, description.attackerAbility);
    output = appendIfSet(output, description.rivalry);
    if (description.isBurned) {
        output += '화상 ';
    }
    if (description.alliesFainted) {
        output += Math.min(5, description.alliesFainted) +
            " ".concat(description.alliesFainted === 1 ? '마리' : '마리', " 쓰러짐 ");
    }
    if (description.attackerTera) {
        output += typeKR[description.attackerTera] + " 테라 ";
    }
    if (description.isBeadsOfRuin) {
        output += '재앙의구슬 적용 ';
    }
    if (description.isSwordOfRuin) {
        output += '재앙의검 적용 ';
    }
    if(nameKR[description.attackerName] === undefined){
        output += description.attackerName + ' ';
    }else{
        output += nameKR[description.attackerName] + ' ';
    }
    if (description.isHelpingHand) {
        output += '도우미 ';
    }
    if (description.isFlowerGiftAttacker) {
        output += ' 플라워기프트 ';
    }
    if (description.isBattery) {
        output += ' Battery boosted ';
    }
    if (description.isPowerSpot) {
        output += ' Power Spot boosted ';
    }
    if (description.isSwitching) {
        output += ' switching boosted ';
    }
    output += findKeyofmove(description.moveName) + ' ';
    if (description.moveBP && description.moveType) {
        output += '(' + description.moveBP + ' BP ' + typeKR[description.moveType] + ') ';
    }
    else if (description.moveBP) {
        output += '(' + description.moveBP + ' BP) ';
    }
    else if (description.moveType) {
        output += '(' + description.moveType + ') ';
    }
    if (description.hits) {
        output += '(' + description.hits + ' 번공격) ';
    }
    output = appendIfSet(output, description.moveTurns);
    output += 'vs. ';
    if (description.defenseBoost) {
        if (description.defenseBoost > 0) {
            output += '+';
        }
        output += description.defenseBoost + ' ';
    }
    output = appendIfSet(output, defenderLevel);
    output = appendIfSet(output, description.HPEVs);
    if (description.defenseEVs) {
        output += '/ ' + description.defenseEVs + ' ';
    }
    output = appendIfSet(output, description.defenderItem);
    output = appendIfSet(output, description.defenderAbility);
    if (description.isTabletsOfRuin) {
        output += ' 재앙의 목간 적용';
    }
    if (description.isVesselOfRuin) {
        output += ' 재앙의 그릇 적용 ';
    }
    if (description.isProtected) {
        output += 'protected ';
    }
    if (description.isDefenderDynamaxed) {
        output += '다이맥스 ';
    }
    if (description.defenderTera) {
        output += typeKR[description.defenderTera] + " 테라 ";
    }
    if(nameKR[description.defenderName] === undefined){
        output += description.defenderName + ' ';
    }else{
        output += nameKR[description.defenderName] + ' ';
    }
    if (description.weather && description.terrain) {
    }
    else if (description.weather) {
        output += ' ,날씨 : ' + description.weather;
    }
    else if (description.terrain) {
        output += ' ,' + description.terrain + ' 필드';
    }
    if (description.isReflect) {
        output += ' 리플렉터 적용됨';
    }
    else if (description.isLightScreen) {
        output += ' ,빛의 장막 적용됨';
    }
    if (description.isFlowerGiftDefender) {
        output += ' ,플라워 기프트 효과 적용됨';
    }
    if (description.isFriendGuard) {
        output += ' ,프렌드 가드로 방어됨';
    }
    if (description.isAuroraVeil) {
        output += ' ,오로라 베일로 방어됨';
    }
    if (description.isCritical) {
        output += ' ,급소에 맞음!';
    }
    if (description.isWonderRoom) {
        output += ' ,원더룸 효과 적용됨';
    }
    return output;
}
function getDescriptionLevels(attacker, defender) {
    if (attacker.level !== defender.level) {
        return [
            attacker.level === 100 ? '' : "Lvl ".concat(attacker.level),
            defender.level === 100 ? '' : "Lvl ".concat(defender.level),
        ];
    }
    var elide = [100, 50, 5].includes(attacker.level);
    var level = elide ? '' : "Lvl ".concat(attacker.level);
    return [level, level];
}
function serializeText(arr) {
    if (arr.length === 0) {
        return '';
    }
    else if (arr.length === 1) {
        return arr[0];
    }
    else if (arr.length === 2) {
        return arr[0] + ' , ' + arr[1];
    }
    else {
        var text = '';
        for (var i = 0; i < arr.length - 1; i++) {
            text += arr[i] + ', ';
        }
        return text + ' , ' + arr[arr.length - 1];
    }
}
function appendIfSet(str, toAppend) {
    return toAppend ? "".concat(str).concat(toAppend, " ") : str;
}
function toDisplay(notation, a, b, f) {
    if (f === void 0) { f = 1; }
    return notation === '%' ? Math.floor((a * (1000 / f)) / b) / 10 : Math.floor((a * (48 / f)) / b);
}
//# sourceMappingURL=desc.js.map