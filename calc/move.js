"use strict";
exports.__esModule = true;

var util_1 = require("./util");
var SPECIAL = ['불꽃', '물', '풀', '전기', '얼음', '에스퍼', '악', '드래곤'];
var Move = (function () {
    function Move(gen, name, options) {
        if (options === void 0) { options = {}; }
        var _a, _b;
        name = options.name || name;
        this.originalName = name;
        var data = (0, util_1.extend)(true, { name: name }, gen.moves.get((0, util_1.toID)(name)), options.overrides);
        this.hits = 1;
        if (options.useMax && data.maxMove) {
            var maxMoveName_1 = getMaxMoveName(data.type, options.species, !!(data.category === 'Status'), options.ability);
            var maxMove_1 = gen.moves.get((0, util_1.toID)(maxMoveName_1));
            var maxPower = function () {
                if (['G-Max Drum Solo', 'G-Max Fire Ball', 'G-Max Hydrosnipe'].includes(maxMoveName_1)) {
                    return 160;
                }
                if (maxMove_1.basePower === 10 || maxMoveName_1 === 'Max Flare') {
                    return data.maxMove.basePower;
                }
                return maxMove_1.basePower;
            };
            data = (0, util_1.extend)(true, {}, maxMove_1, {
                name: maxMoveName_1,
                basePower: maxPower(),
                category: data.category
            });
        }
        if (options.useZ && ((_a = data.zMove) === null || _a === void 0 ? void 0 : _a.basePower)) {
            var zMoveName = getZMoveName(data.name, data.type, options.item);
            var zMove = gen.moves.get((0, util_1.toID)(zMoveName));
            data = (0, util_1.extend)(true, {}, zMove, {
                name: zMoveName,
                basePower: zMove.basePower === 1 ? data.zMove.basePower : zMove.basePower,
                category: data.category
            });
        }
        else {
            if (data.multihit) {
                if (typeof data.multihit === 'number') {
                    this.hits = data.multihit;
                }
                else if (options.hits) {
                    this.hits = options.hits;
                }
                else {
                    this.hits = (options.ability === 'Skill Link')
                        ? data.multihit[1]
                        : data.multihit[0] + 1;
                }
            }
            this.timesUsedWithMetronome = options.timesUsedWithMetronome;
        }
        this.gen = gen;
        this.name = data.name;
        this.ability = options.ability;
        this.item = options.item;
        this.useZ = options.useZ;
        this.useMax = options.useMax;
        this.overrides = options.overrides;
        this.species = options.species;
        this.bp = data.basePower;
        var typelessDamage = (gen.num >= 2 && data.id === 'struggle') ||
            (gen.num <= 4 && ['futuresight', 'doomdesire'].includes(data.id));
        this.type = typelessDamage ? '???' : data.type;
        this.category = data.category ||
            (gen.num < 4 ? (SPECIAL.includes(data.type) ? 'Special' : 'Physical') : 'Status');
        var stat = this.category === 'Special' ? 'spa' : 'atk';
        if (((_b = data.self) === null || _b === void 0 ? void 0 : _b.boosts) && data.self.boosts[stat] && data.self.boosts[stat] < 0) {
            this.dropsStats = Math.abs(data.self.boosts[stat]);
        }
        this.timesUsed = (this.dropsStats && options.timesUsed) || 1;
        this.secondaries = data.secondaries;
        this.target = data.target || 'any';
        this.recoil = data.recoil;
        this.hasCrashDamage = !!data.hasCrashDamage;
        this.mindBlownRecoil = !!data.mindBlownRecoil;
        this.struggleRecoil = !!data.struggleRecoil;
        this.isCrit = !!options.isCrit || !!data.willCrit ||
            gen.num === 1 && ['crabhammer', 'razorleaf', 'slash', 'karate chop'].includes(data.id);
        this.drain = data.drain;
        this.flags = data.flags;
        this.priority = data.priority || 0;
        this.ignoreDefensive = !!data.ignoreDefensive;
        this.overrideOffensiveStat = data.overrideOffensiveStat;
        this.overrideDefensiveStat = data.overrideDefensiveStat;
        this.overrideOffensivePokemon = data.overrideOffensivePokemon;
        this.overrideDefensivePokemon = data.overrideDefensivePokemon;
        this.breaksProtect = !!data.breaksProtect;
        this.isZ = !!data.isZ;
        this.isMax = !!data.isMax;
        if (!this.bp) {
            if (['return', 'frustration', 'pikapapow', 'veeveevolley'].includes(data.id)) {
                this.bp = 102;
            }
        }
    }
    Move.prototype.named = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        return names.includes(this.name);
    };
    Move.prototype.hasType = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        return types.includes(this.type);
    };
    Move.prototype.clone = function () {
        return new Move(this.gen, this.originalName, {
            ability: this.ability,
            item: this.item,
            species: this.species,
            useZ: this.useZ,
            useMax: this.useMax,
            isCrit: this.isCrit,
            hits: this.hits,
            timesUsed: this.timesUsed,
            timesUsedWithMetronome: this.timesUsedWithMetronome,
            overrides: this.overrides
        });
    };
    return Move;
}());
exports.Move = Move;
function getZMoveName(moveName, moveType, item) {
    item = item || '';
    if (moveName.includes('Hidden Power'))
        return 'Breakneck Blitz';
    if (moveName === 'Clanging Scales' && item === 'Kommonium Z')
        return 'Clangorous Soulblaze';
    if (moveName === 'Darkest Lariat' && item === 'Incinium Z')
        return 'Malicious Moonsault';
    if (moveName === 'Giga Impact' && item === 'Snorlium Z')
        return 'Pulverizing Pancake';
    if (moveName === 'Moongeist Beam' && item === 'Lunalium Z')
        return 'Menacing Moonraze Maelstrom';
    if (moveName === 'Photon Geyser' && item === 'Ultranecrozium Z') {
        return 'Light That Burns the Sky';
    }
    if (moveName === 'Play Rough' && item === 'Mimikium Z')
        return 'Let\'s Snuggle Forever';
    if (moveName === '에스퍼' && item === 'Mewnium Z')
        return 'Genesis Supernova';
    if (moveName === 'Sparkling Aria' && item === 'Primarium Z')
        return 'Oceanic Operetta';
    if (moveName === 'Spectral Thief' && item === 'Marshadium Z') {
        return 'Soul-Stealing 7-Star Strike';
    }
    if (moveName === 'Spirit Shackle' && item === 'Decidium Z')
        return 'Sinister Arrow Raid';
    if (moveName === 'Stone Edge' && item === 'Lycanium Z')
        return 'Splintered Stormshards';
    if (moveName === 'Sunsteel Strike' && item === 'Solganium Z')
        return 'Searing Sunraze Smash';
    if (moveName === 'Volt Tackle' && item === 'Pikanium Z')
        return 'Catastropika';
    if (moveName === 'Nature\'s Madness' && item === 'Tapunium Z')
        return 'Guardian of Alola';
    if (moveName === 'Thunderbolt') {
        if (item === 'Aloraichium Z')
            return 'Stoked Sparksurfer';
        if (item === 'Pikashunium Z')
            return '10,000,000 Volt Thunderbolt';
    }
    return ZMOVES_TYPING[moveType];
}
exports.getZMoveName = getZMoveName;
var ZMOVES_TYPING = {
    벌레: 'Savage Spin-Out',
    악: 'Black Hole Eclipse',
    드래곤: 'Devastating Drake',
    전기: 'Gigavolt Havoc',
    페어리: 'Twinkle Tackle',
    격투: 'All-Out Pummeling',
    불꽃: 'Inferno Overdrive',
    비행: 'Supersonic Skystrike',
    고스트: 'Never-Ending Nightmare',
    풀: 'Bloom Doom',
    땅: 'Tectonic Rage',
    얼음: 'Subzero Slammer',
    노말: 'Breakneck Blitz',
    독: 'Acid Downpour',
    에스퍼: 'Shattered Psyche',
    바위: 'Continental Crush',
    강철: 'Corkscrew Crash',
    물: 'Hydro Vortex'
};
function getMaxMoveName(moveType, pokemonSpecies, isStatus, pokemonAbility) {
    if (isStatus)
        return 'Max Guard';
    if (pokemonAbility === 'Normalize')
        return 'Max Strike';
    if (moveType === '불꽃') {
        if (pokemonSpecies === 'Charizard-Gmax')
            return '거다이옥염';
        if (pokemonSpecies === 'Centiskorch-Gmax')
            return 'G-Max Centiferno';
        if (pokemonSpecies === 'Cinderace-Gmax')
            return 'G-Max Fire Ball';
    }
    if (moveType === '노말') {
        if (pokemonSpecies === 'Eevee-Gmax')
            return 'G-Max Cuddle';
        if (pokemonSpecies === 'Meowth-Gmax')
            return 'G-Max Gold Rush';
        if (pokemonSpecies === 'Snorlax-Gmax')
            return 'G-Max Replenish';
        if (pokemonAbility === 'Pixilate')
            return 'Max Starfall';
        if (pokemonAbility === 'Aerilate')
            return 'Max Airstream';
        if (pokemonAbility === 'Refrigerate')
            return 'Max Hailstorm';
        if (pokemonAbility === 'Galvanize')
            return 'Max Lightning';
    }
    if (moveType === '페어리') {
        if (pokemonSpecies === 'Alcremie-Gmax')
            return 'G-Max Finale';
        if (pokemonSpecies === 'Hatterene-Gmax')
            return 'G-Max Smite';
    }
    if (moveType === '강철') {
        if (pokemonSpecies === 'Copperajah-Gmax')
            return 'G-Max Steelsurge';
        if (pokemonSpecies === 'Melmetal-Gmax')
            return 'G-Max Meltdown';
    }
    if (moveType === '전기') {
        if (pokemonSpecies === 'Pikachu-Gmax')
            return 'G-Max Volt Crash';
        if ((pokemonSpecies === null || pokemonSpecies === void 0 ? void 0 : pokemonSpecies.startsWith('Toxtricity')) &&
            (pokemonSpecies === null || pokemonSpecies === void 0 ? void 0 : pokemonSpecies.endsWith('Gmax')))
            return 'G-Max Stun Shock';
    }
    if (moveType === '풀') {
        if (pokemonSpecies === 'Appletun-Gmax')
            return 'G-Max Sweetness';
        if (pokemonSpecies === 'Flapple-Gmax')
            return 'G-Max Tartness';
        if (pokemonSpecies === 'Rillaboom-Gmax')
            return 'G-Max Drum Solo';
        if (pokemonSpecies === 'Venusaur-Gmax')
            return 'G-Max Vine Lash';
    }
    if (moveType === '물') {
        if (pokemonSpecies === 'Blastoise-Gmax')
            return 'G-Max Cannonade';
        if (pokemonSpecies === 'Drednaw-Gmax')
            return 'G-Max Stonesurge';
        if (pokemonSpecies === 'Inteleon-Gmax')
            return 'G-Max Hydrosnipe';
        if (pokemonSpecies === 'Kingler-Gmax')
            return 'G-Max Foam Burst';
        if (pokemonSpecies === 'Urshifu-Rapid-Strike-Gmax')
            return 'G-Max Rapid Flow';
    }
    if (moveType === '악') {
        if (pokemonSpecies === 'Grimmsnarl-Gmax')
            return 'G-Max Snooze';
        if (pokemonSpecies === 'Urshifu-Gmax')
            return 'G-Max One Blow';
    }
    if (moveType === '독' && pokemonSpecies === 'Garbodor-Gmax')
        return 'G-Max Malodor';
    if (moveType === '격투' && pokemonSpecies === 'Machamp-Gmax')
        return 'G-Max Chi Strike';
    if (moveType === '고스트' && pokemonSpecies === 'Gengar-Gmax')
        return 'G-Max Terror';
    if (moveType === '얼음' && pokemonSpecies === 'Lapras-Gmax')
        return 'G-Max Resonance';
    if (moveType === '비행' && pokemonSpecies === 'Corviknight-Gmax')
        return 'G-Max Wind Rage';
    if (moveType === '드래곤' && pokemonSpecies === 'Duraludon-Gmax')
        return 'G-Max Depletion';
    if (moveType === '에스퍼' && pokemonSpecies === 'Orbeetle-Gmax')
        return 'G-Max Gravitas';
    if (moveType === '바위' && pokemonSpecies === 'Coalossal-Gmax')
        return 'G-Max Volcalith';
    if (moveType === '땅' && pokemonSpecies === 'Sandaconda-Gmax')
        return 'G-Max Sandblast';
    if (moveType === '악' && pokemonSpecies === 'Grimmsnarl-Gmax')
        return 'G-Max Snooze';
    return 'Max ' + MAXMOVES_TYPING[moveType];
}
exports.getMaxMoveName = getMaxMoveName;
var MAXMOVES_TYPING = {
    벌레: 'Flutterby',
    악: 'Darkness',
    드래곤: 'Wyrmwind',
    전기: 'Lightning',
    페어리: 'Starfall',
    격투: 'Knuckle',
    불꽃: 'Flare',
    비행: 'Airstream',
    고스트: 'Phantasm',
    풀: 'Overgrowth',
    땅: 'Quake',
    얼음: 'Hailstorm',
    노말: 'Strike',
    독: 'Ooze',
    에스퍼: 'Mindstorm',
    바위: 'Rockfall',
    강철: 'Steelspike',
    물: 'Geyser'
};
//# sourceMappingURL=move.js.map