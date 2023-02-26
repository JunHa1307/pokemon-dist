const { SPECIES } = require("../calc/data/species");
let pokemonsKey = Object.keys(SPECIES[9]);
let pokemonsVal = Object.values(SPECIES[9]);
let SPECIES_2 = {};
for(let i = 0; i < pokemonsKey.length; i ++){

    let bs = 0;
    for(let j = 0; j < 6; j++){
        bs += Object.values(SPECIES[9][pokemonsKey[i]].bs)[j];
    }
    if(bs >= 420 && nameKR[pokemonsKey[i]] != undefined){
        SPECIES_2[pokemonsKey[i]] = pokemonsVal[i];
    }
}
console.log(SPECIES_2);
$(function(){
    $("legend").click(function(){
        if($(this).closest(".poke-info").attr("class") != "poke-info maximum"){
            $(this).closest(".poke-info").removeClass("minimum").addClass("maximum");
        }else{
            $(this).closest(".poke-info").removeClass("maximum").addClass("minimum");
        }
    });
});

field = createField();

$(".set-selector").change(function () {
    pokeinfo = $(this).closest(".poke-info");
    pokemon = createPokemon(pokeinfo);
    pokeinfo.find(".sp .totalMod").text(getFinalSpeed(9,pokemon,field,field.attackerSide));
});

$(".sp .evs, .sp .ivs, .sp .base, #itemL1").bind("change keyup",function(){
    let totalSpeed = getFinalSpeed(9,createPokemon($(this).closest(".poke-info")),field,field.attackerSide);
    $(this).parents(".sp").find(".totalMod").text(totalSpeed);
});


const TYPE_CHART_DEFENCE_SV = {
    '???': {
        Normal:  1,
        Grass: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 1,
        Bug: 1,
        Poison: 1,
        Ground: 1,
        Rock: 1,
        Fighting: 1,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 1,
        Fairy: 1
    },
    Normal:  {
        '???': 1,
        Normal:  1,
        Grass: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 1,
        Bug: 1,
        Poison: 1,
        Ground: 1,
        Rock: 1,
        Fighting: 2,
        Psychic: 1,
        Ghost: 0,
        Dragon: 1,
        Dark: 1,
        Steel: 1,
        Fairy: 1
    },
    Grass: {
        '???': 1,
        Normal:  1,
        Grass: 0.5,
        Fire: 2,
        Water: 0.5,
        Electric: 0.5,
        Ice: 2,
        Flying: 2,
        Bug: 2,
        Poison: 2,
        Ground: 0.5,
        Rock: 1,
        Fighting: 1,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1,
        Steel: 1,
        Fairy: 1
    },
    Fire: {
        '???': 1,
        Normal:  1,
        Grass: 0.5,
        Fire: 0.5,
        Water: 2,
        Electric: 1,
        Ice: 0.5,
        Flying: 1,
        Bug: 0.5,
        Poison: 1,
        Ground: 2,
        Rock: 2,
        Fighting: 1,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 0.5,
        Fairy: 0.5
    },
    Water: {
        '???': 1,
        Normal:  1,
        Grass: 2,
        Fire: 0.5,
        Water: 0.5,
        Electric: 2,
        Ice: 0.5,
        Flying: 1,
        Bug: 1,
        Poison: 1,
        Ground: 1,
        Rock: 1,
        Fighting: 1,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 0.5,
        Fairy: 1
    },
    Electric: {
        '???': 1,
        Normal:  1,
        Grass: 1,
        Fire: 1,
        Water: 1,
        Electric: 0.5,
        Ice: 1,
        Flying: 0.5,
        Bug: 1,
        Poison: 1,
        Ground: 2,
        Rock: 1,
        Fighting: 1,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 0.5,
        Fairy: 1
    },
    Ice: {
        '???': 1,
        Normal:  1,
        Grass: 1,
        Fire: 2,
        Water: 1,
        Electric: 1,
        Ice: 0.5,
        Flying: 1,
        Bug: 1,
        Poison: 1,
        Ground: 1,
        Rock: 2,
        Fighting: 2,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 2,
        Fairy: 1
    },
    Flying: {
        '???': 1,
        Normal:  1,
        Grass: 0.5,
        Fire: 1,
        Water: 1,
        Electric: 2,
        Ice: 2,
        Flying: 1,
        Bug: 0.5,
        Poison: 1,
        Ground: 0,
        Rock: 2,
        Fighting: 0.5,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 1,
        Fairy: 1
    },
    Bug: {
        '???': 1,
        Normal:  1,
        Grass: 0.5,
        Fire: 2,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 2,
        Bug: 1,
        Poison: 1,
        Ground: 0.5,
        Rock: 2,
        Fighting: 0.5,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 1,
        Fairy: 1
    },
    Poison: {
        '???': 1,
        Normal:  1,
        Grass: 0.5,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 1,
        Bug: 1,
        Poison: 0.5,
        Ground: 2,
        Rock: 0.5,
        Fighting: 0.5,
        Psychic: 2,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 1,
        Fairy: 0.5
    },
    Ground: {
        '???': 1,
        Normal:  1,
        Grass: 2,
        Fire: 1,
        Water: 2,
        Electric: 0,
        Ice: 2,
        Flying: 1,
        Bug: 1,
        Poison: 0.5,
        Ground: 1,
        Rock: 0.5,
        Fighting: 1,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 1,
        Fairy: 1
    },
    Rock: {
        '???': 1,
        Normal:  0.5,
        Grass: 2,
        Fire: 0.5,
        Water: 2,
        Electric: 1,
        Ice: 1,
        Flying: 0.5,
        Bug: 1,
        Poison: 0.5,
        Ground: 2,
        Rock: 1,
        Fighting: 2,
        Psychic: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1, 
        Steel: 2,
        Fairy: 1
    },
    Fighting: {
        '???': 1,
        Normal:  1,
        Grass: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 2,
        Bug: 0.5,
        Poison: 1,
        Ground: 1,
        Rock: 0.5,
        Fighting: 1,
        Psychic: 2,
        Ghost: 1,
        Dragon: 1,
        Dark: 0.5, 
        Steel: 1,
        Fairy: 2
    },
    Psychic: {
        '???': 1,
        Normal:  1,
        Grass: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 1,
        Bug: 2,
        Poison: 1,
        Ground: 1,
        Rock: 1,
        Fighting: 0.5,
        Psychic: 0.5,
        Ghost: 2,
        Dragon: 1,
        Dark: 2, 
        Steel: 1,
        Fairy: 1
    },
    Ghost: {
        '???': 1,
        Normal:  0,
        Grass: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 1,
        Bug: 0.5,
        Poison: 0.5,
        Ground: 1,
        Rock: 1,
        Fighting: 0,
        Psychic: 1,
        Ghost: 2,
        Dragon: 1,
        Dark: 2, 
        Steel: 1,
        Fairy: 1
    },
    Dragon: {
        '???': 1,
        Normal:  1,
        Grass: 0.5,
        Fire: 0.5,
        Water: 0.5,
        Electric: 0.5,
        Ice: 2,
        Flying: 1,
        Bug: 1,
        Poison: 1,
        Ground: 1,
        Rock: 1,
        Fighting: 1,
        Psychic: 1,
        Ghost: 1,
        Dragon: 2,
        Dark: 1, 
        Steel: 1,
        Fairy: 2
    },
    Dark: {
        '???': 1,
        Normal:  1,
        Grass: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 1,
        Bug: 2,
        Poison: 1,
        Ground: 1,
        Rock: 1,
        Fighting: 2,
        Psychic: 0,
        Ghost: 0.5,
        Dragon: 1,
        Dark: 0.5,
        Steel: 1,
        Fairy: 2
    },
    Steel: {
        '???': 1,
        Normal:  0.5,
        Grass: 0.5,
        Fire: 2,
        Water: 1,
        Electric: 1,
        Ice: 0.5,
        Flying: 0.5,
        Bug: 0.5,
        Poison: 0,
        Ground: 2,
        Rock: 0.5,
        Fighting: 2,
        Psychic: 0.5,
        Ghost: 1,
        Dragon: 0.5,
        Dark: 1,
        Steel: 0.5,
        Fairy: 0.5
    },
    Fairy: {
        '???': 1,
        Normal:  1,
        Grass: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Ice: 1,
        Flying: 1,
        Bug: 0.5,
        Poison: 2,
        Ground: 1,
        Rock: 1,
        Fighting: 0.5,
        Psychic: 1,
        Ghost: 1,
        Dragon: 0,
        Dark: 0.5,
        Steel: 2,
        Fairy: 1
    }
}
// p1.species.otherFormes .species => 포켓몬 원본
// p1.stats 능력치
// p1.types 타입배열
// p1.teraType = $("#p1 .teraType").val(); 테라타입
// Object.keys(obj)는 객체의 key를 배열로 리턴합니다.
// Object.values(obj)는 객체의 value를 배열로 리턴합니다.
// for (const [key, value] of Object.entries(myObj)) {
//     console.log(`${key}: ${value}`);
// }
// type =[[Grass,Ice],[Grass,Ice],...]
// 가장 높은 스탯 / 물리내구 / 특내구 / 스피드 
// 내구력 = HP * 물방 or 특방 / (0.00822 * LV)
// 카운터 포켓몬 보여주기= 1보다 작은 타입은 빼고 거기서 1보다 큰 타입들이면 배열에 추가
function partyAnalysis(){
    $(".sp .evs").change();
    let list = []; 
    for(let i = 0 ; i < $(".pokemonCount").val(); i++){
        list[i] = createPokemon($(`#p${i+1}`));
        list[i].stats.spe =getFinalSpeed(9,list[i],field,field.attackerSide);
        list[i].teraType = $(`#p${i+1} .teraType`).val();
        console.log(list[i]);
    }
    let type = [];
    for(let i = 0; i < list.length; i++){
        type[i]= list[i].types
        type[i][2] = list[i].teraType;
    }

    let attackResult = checkTypeStrength(type);
    let defenceResult = checkTypeWeekness(type,list);
    console.log(defenceResult);
}


function checkTypeStrength(type){
    let typeChart = calc.TYPE_CHART[9];
    let totalTypeResult = {
        '???': 0, Normal:  0, Grass: 0, Fire: 0, Water: 0, Electric: 0, Ice: 0, Flying: 0, Bug: 0,
        Poison: 0, Ground: 0, Rock: 0, Fighting: 0, Psychic: 0, Ghost: 0, Dragon: 0, Dark: 0, Steel: 0, Fairy: 0
    };
    let typeResultList = [];
    for(let i = 0; i < type.length; i++){
        let type1 = typeChart[type[i][0]];
        let type2 = {};
        let type1Keys = Object.keys(type1);
        let typeResult = {};

        if(type[i][1] != ""){
            type2 = typeChart[type[i][1]];

            for(let j = 0; j < type1Keys.length; j++){
                let type1Val = Object.values(type1)[j];
                let type2Val = Object.values(type2)[j];
                if(type1Val == 0 || type2Val == 0){
                    typeResult[type1Keys[j]] = type1Val + type2Val;
                }else if((type1Val * type2Val) == 0.5){
                    typeResult[type1Keys[j]] = 0.75;
                }else{
                    typeResult[type1Keys[j]] = type1Val * type2Val;
                }
                totalTypeResult[type1Keys[j]] += typeResult[type1Keys[j]];
            }
        }else{
            for(let k = 0; k < type1Keys.length; k++){
                typeResult[type1Keys[k]] = Object.values(type1)[k];
                totalTypeResult[type1Keys[k]] += typeResult[type1Keys[k]];
            }
        }
        typeResultList[i] = typeResult;
    }
    typeResultList[type.length] = totalTypeResult;
    return typeResultList;
}

function checkTypeWeekness(type,list){
    let typeChart = TYPE_CHART_DEFENCE_SV;
    let totalTypeResult = {
        '???': 0, Normal:  0, Grass: 0, Fire: 0, Water: 0, Electric: 0, Ice: 0, Flying: 0, Bug: 0,
        Poison: 0, Ground: 0, Rock: 0, Fighting: 0, Psychic: 0, Ghost: 0, Dragon: 0, Dark: 0, Steel: 0, Fairy: 0
    };
    let typeResultList = [];
    for(let i = 0; i < type.length; i++){
        let type1 = typeChart[type[i][0]];
        let type2 = {};
        let type1Keys = Object.keys(type1);
        let typeResult = {};

        if(type[i][1] != ""){
            type2 = typeChart[type[i][1]];

            for(let j = 0; j < type1Keys.length; j++){
                let type1Val = Object.values(type1)[j];
                let type2Val = Object.values(type2)[j];
                
                typeResult[type1Keys[j]] = type1Val * type2Val;
            }
        }else{
            for(let k = 0; k < type1Keys.length; k++){
                typeResult[type1Keys[k]] = Object.values(type1)[k];
            }
        }

        if(list[i].hasAbility('Storm Drain')||list[i].hasAbility('Water Absorb')){
            typeResult.Water = 0;
        }else if(list[i].hasAbility('Dry Skin')){
            typeResult.Water = 0;
            typeResult.Fire *= 1.25;
        }else if(list[i].hasAbility('Flash Fire')||list[i].hasAbility('HeatProof')){
            typeResult.Fire = 0;
        }else if(list[i].hasAbility('Thick Fat')){
            typeResult.Fire *= 0.5;
            typeResult.Ice *= 0.5;
        }else if(list[i].hasAbility('Levitate')){
            typeResult.Ground = 0;
        }else if(list[i].hasAbility('Scrappy') && typeResult.Ghost == 0){
            typeResult.Ghost = 1;
        }else if(list[i].hasAbility('Motor Drive')||list[i].hasAbility('Volt Absorb')||list[i].hasAbility('Lightning Rod')){
            typeResult.Electric = 0;
        }else if(list[i].hasAbility('Sap Sipper')){
            typeResult.Grass = 0;
        }else if(list[i].hasAbility('Fluffy')){
            typeResult.Fire *= 2;
        }
        for(let j = 0; j < type1Keys.length; j++){
            totalTypeResult[type1Keys[j]] += typeResult[type1Keys[j]];
        }
        typeResultList[i] = typeResult;
    }
    typeResultList[type.length] = totalTypeResult;
    return typeResultList;
}