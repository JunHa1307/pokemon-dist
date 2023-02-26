const { SPECIES } = require("../calc/data/species");
let pokemonsKey = Object.keys(SPECIES[9]);
let pokemonsVal = Object.values(SPECIES[9]);
let SPECIES_2 = {};

$('.analysisResult').hide();
for(let i = 0; i < pokemonsKey.length; i ++){

    let bs = 0;
    for(let j = 0; j < 6; j++){
        bs += Object.values(SPECIES[9][pokemonsKey[i]].bs)[j];
    }
    if(bs >= 420 && nameKR[pokemonsKey[i]] != undefined){
        SPECIES_2[pokemonsKey[i]] = pokemonsVal[i];
    }
}
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
    gtag('event', '파티분석', {'event_category': 'engagement','event_label': '분석버튼클릭','value': '분석'});
    $(".sp .evs").change();
    let list = []; 
    for(let i = 0 ; i < $(".pokemonCount").val(); i++){
        list[i] = createPokemon($(`#p${i+1}`));
        list[i].stats.spe =getFinalSpeed(9,list[i],field,field.attackerSide);
        list[i].teraType = $(`#p${i+1} .teraType`).val();
    }
    let type = [];
    for(let i = 0; i < list.length; i++){
        type[i]= list[i].types
        type[i][2] = list[i].teraType;
    }
    teamTable(list,list.length);
    let attackResult = checkTypeStrength(type);
    let defenceResult = checkTypeWeekness(type,list);

    pokeAnalysis(list,type);
    counterPokeAnalysis(defenceResult,list);

    console.log(defenceResult);
    console.log(list[0]);

    $('.analysisResult').slideDown(function(){
        window.scrollTo({top:document.querySelector(".analysisResult").offsetTop,behavior:'smooth'});
    });
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
    for(let i = 0; i < 18; i ++){
        removeData(attackChart);
    }
    for(let i = 1; i<=18; i ++){
        addData(attackChart,typeKR[Object.keys(totalTypeResult)[i]],totalTypeResult[Object.keys(totalTypeResult)[i]]);
    }
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
    for(let i = 0; i < 18; i ++){
        removeData(defenceChart);
    }
    for(let i = 1; i<=18; i ++){
        addData(defenceChart,typeKR[Object.keys(totalTypeResult)[i]],totalTypeResult[Object.keys(totalTypeResult)[i]]);
    }
    return typeResultList;
}
var context = document.getElementById('attackChart').getContext('2d');
var attackChart = new Chart(context, {
    type: 'bar',
    data: {
        labels: [
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
            // typeKR[(key=Object.keys(TYPE_CHART_DEFENCE_SV))[1]],typeKR[key[2]],typeKR[key[3]],
            // typeKR[key[4]],typeKR[key[5]],typeKR[key[6]],typeKR[key[7]],typeKR[key[8]],typeKR[key[9]],typeKR[key[10]],
            // typeKR[key[11]],typeKR[key[12]],typeKR[key[13]],typeKR[key[14]],typeKR[key[15]],typeKR[key[16]],typeKR[key[17]],typeKR[key[18]]
        ],
        datasets: [
            { //데이터
                label: '공격 상성 (높음 = 강함)',
                data: [21,19,25,20,23,26,25,21,19,25,20,23,26,25,21,19,25,20
                    // totalTypeResult[key[1]],totalTypeResult[key[2]],totalTypeResult[key[3]],totalTypeResult[key[4]],totalTypeResult[key[5]],totalTypeResult[key[6]],totalTypeResult[key[7]],
                    // totalTypeResult[key[8]],totalTypeResult[key[9]],totalTypeResult[key[10]],totalTypeResult[key[11]],totalTypeResult[key[12]],totalTypeResult[key[13]],
                    // totalTypeResult[key[14]],totalTypeResult[key[15]],totalTypeResult[key[16]],totalTypeResult[key[17]],totalTypeResult[key[18]]
                ],
                backgroundColor: [
                    //색상
                    'rgba(173, 165, 148, 0.2)',
                    'rgba(56, 154, 2, 0.2)',
                    'rgba(242, 88, 2, 0.2)',
                    'rgba(2, 103, 194, 0.2)',
                    'rgba(251, 185, 23, 0.2)',
                    'rgba(109, 211, 245, 0.2)',
                    'rgba(93, 115, 212, 0.2)',
                    'rgba(136, 150, 14, 0.2)',
                    'rgba(107, 36, 110, 0.2)',
                    'rgba(201, 86, 28, 0.2)',
                    'rgba(158, 134, 61, 0.2)',
                    'rgba(192, 48, 40, 0.2)',
                    'rgba(220, 49, 101, 0.2)',
                    'rgba(105, 85, 130, 0.2)',
                    'rgba(78, 59, 164, 0.2)',
                    'rgba(60, 35, 45, 0.2)',
                    'rgba(142, 142, 159, 0.2)',
                    'rgba(224, 142, 224, 0.2)'
                ],
                borderColor: [
                    //경계선 색상
                    'rgba(173, 165, 148, 1)',
                    'rgba(56, 154, 2, 1)',
                    'rgba(242, 88, 2, 1)',
                    'rgba(2, 103, 194, 1)',
                    'rgba(251, 185, 23, 1)',
                    'rgba(109, 211, 245, 1)',
                    'rgba(93, 115, 212, 1)',
                    'rgba(136, 150, 14, 1)',
                    'rgba(107, 36, 110, 1)',
                    'rgba(201, 86, 28, 1)',
                    'rgba(158, 134, 61, 1)',
                    'rgba(192, 48, 40, 1)',
                    'rgba(220, 49, 101, 1)',
                    'rgba(105, 85, 130, 1)',
                    'rgba(78, 59, 164, 1)',
                    'rgba(60, 35, 45, 1)',
                    'rgba(142, 142, 159, 1)',
                    'rgba(224, 142, 224, 1)'
                ],
                borderWidth: 1 //경계선 굵기
            }
        ]
    }
});
var context = document
    .getElementById('defenceChart')
    .getContext('2d');
var defenceChart = new Chart(context, {
    type: 'bar', // 차트의 형태
    data: { // 차트에 들어갈 데이터
        labels: [
           1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 
        ],
        datasets: [
            { //데이터
                label: '방어 상성 (높음 = 약함)',
                data: [
                    21,19,25,20,23,26,25,21,19,25,20,23,26,25,21,19,25,20 //x축 label에 대응되는 데이터 값
                ],
                backgroundColor: [
                    //색상
                    'rgba(173, 165, 148, 0.2)',
                    'rgba(56, 154, 2, 0.2)',
                    'rgba(242, 88, 2, 0.2)',
                    'rgba(2, 103, 194, 0.2)',
                    'rgba(251, 185, 23, 0.2)',
                    'rgba(109, 211, 245, 0.2)',
                    'rgba(93, 115, 212, 0.2)',
                    'rgba(136, 150, 14, 0.2)',
                    'rgba(107, 36, 110, 0.2)',
                    'rgba(201, 86, 28, 0.2)',
                    'rgba(158, 134, 61, 0.2)',
                    'rgba(192, 48, 40, 0.2)',
                    'rgba(220, 49, 101, 0.2)',
                    'rgba(105, 85, 130, 0.2)',
                    'rgba(78, 59, 164, 0.2)',
                    'rgba(60, 35, 45, 0.2)',
                    'rgba(142, 142, 159, 0.2)',
                    'rgba(224, 142, 224, 0.2)'
                ],
                borderColor: [
                    //경계선 색상
                    'rgba(173, 165, 148, 1)',
                    'rgba(56, 154, 2, 1)',
                    'rgba(242, 88, 2, 1)',
                    'rgba(2, 103, 194, 1)',
                    'rgba(251, 185, 23, 1)',
                    'rgba(109, 211, 245, 1)',
                    'rgba(93, 115, 212, 1)',
                    'rgba(136, 150, 14, 1)',
                    'rgba(107, 36, 110, 1)',
                    'rgba(201, 86, 28, 1)',
                    'rgba(158, 134, 61, 1)',
                    'rgba(192, 48, 40, 1)',
                    'rgba(220, 49, 101, 1)',
                    'rgba(105, 85, 130, 1)',
                    'rgba(78, 59, 164, 1)',
                    'rgba(60, 35, 45, 1)',
                    'rgba(142, 142, 159, 1)',
                    'rgba(224, 142, 224, 1)'
                ],
                borderWidth: 1
            }
        ]
    }
});
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function teamTable(list,length){
    document.querySelector(".pokemonStatView").innerHTML = "<tr><th> </th><th>이름</th><th>공격</th><th>특공</th><th>물리내구</th><th>특수내구</th><th>스피드</th></tr>";
    for(let i = 0; i < length; i++){
    document.querySelector(".pokemonStatView").innerHTML += "<td>" + (i+1) + "</td>"+
                                                            "<td>" + nameKR[list[i].name] + "</td>"+
                                                            "<td>" + list[i].stats.atk + "</td>"+
                                                            "<td>" + list[i].stats.spa + "</td>"+
                                                            "<td>" + Math.floor(list[i].stats.hp * list[i].stats.def / (0.00822 * list[i].level)) + "</td>"+
                                                            "<td>" + Math.floor(list[i].stats.hp * list[i].stats.spd / (0.00822 * list[i].level)) + "</td>"+
                                                            "<td>" + list[i].stats.spe + "</td>";
    }
}

function pokeAnalysis(list,type){
    document.querySelector(".pokemonResult").innerHTML = '';
    for(let i = 0; i < list.length; i++){    
    let position = pokePosition(list[i]);
    document.querySelector(".pokemonResult").innerHTML += "<div>"+
                                                            "<img src='../img/sprite/"+list[i].name+".png' alt='"+list[i].name+"'>"+
                                                            "<div>"+ nameKR[list[i].name] +"</div>"+
                                                            "<div>타입 : "+typeKR[type[i][0]] + (type[i][1] ? " / "+typeKR[type[i][1]] : '')+"</div>"+
                                                            "<div>가장 강한 능력치 : "+  position[0]+"</div>"+
                                                            "<div>예상 역할 : " + position[1] + (position[2]?position[2]:'') + "</div>"
                                                        +"</div>";
    }
}

function pokePosition(pokemon){
    let list = [];
    let value = Math.max(pokemon.stats.hp,pokemon.stats.atk,pokemon.stats.spa,pokemon.stats.def,pokemon.stats.spd,pokemon.stats.spe);
    let key = Object.keys(pokemon.stats).find(key => pokemon.stats[key] === value);
    if(key == 'hp'){
        list.push('체력');
    }else if(key == 'atk'){
        list.push('공격');
    }else if(key == 'spa'){
        list.push('특수공격');
    }else if(key == 'def'){
        list.push('방어');
    }else if(key == 'spd'){
        list.push('특수방어');
    }else if(key == 'spe'){
        list.push('스피드');
    }

    for(let i = 0; i < pokemon.moves.length; i++){
        if(pokemon.moves[i].name == 'Snowscape' || pokemon.moves[i].name == 'Rain Dance' || pokemon.moves[i].name == 'Sunny Day' ||pokemon.moves[i].name == 'Sandstorm'
        || pokemon.moves[i].name == 'Chilly Reception'){
            list.push("날씨 요원 ");
        }else if(pokemon.moves[i].name == 'Trick Room'){
            list.push("트릭룸 요원 ");
        }else if(pokemon.moves[i].name == 'Wonder Room'){
            list.push("원더룸 요원 ");
        }else if(pokemon.moves[i].name == 'Magic Room'){
            list.push("매직룸 요원 ");
        }else if(pokemon.moves[i].name == 'Sword Dance' || pokemon.moves[i].name == 'Calm Mind' || pokemon.moves[i].name == 'Dragon Dance'
        || pokemon.moves[i].name == 'Belly Drum' || pokemon.moves[i].name == 'Bulk Up' || pokemon.moves[i].name == 'No Retreat' ||
        pokemon.moves[i].name == 'Nasty Plot' || pokemon.moves[i].name == 'Shell Smash'){
            list.push("랭업 스위퍼 ");
        }else if(pokemon.moves[i].name == 'Stealth Rock' || pokemon.moves[i].name == 'Toxic Spikes' || pokemon.moves[i].name == 'Sticky Web' || pokemon.moves[i].name == 'Spikes'){
            list.push("장판기 보유 ");
        }
    }

    if(list[1] == null && pokemon.hasAbility("Snow Warning") || pokemon.hasAbility("Drought") || pokemon.hasAbility("Drizzle")){
        list.push("첫턴 날씨요원 ");
    }

    if(list[0] == '방어' || list[0] == '특수방어' || list[0] == '체력'){
        list.push("막이");
    }else if(list[0] == '공격'){
        list.push("물리 어태커");
    }else if(list[0] == '특수공격'){
        list.push("특수공격 어태커");
    }
    console.log(list);
    return list;
}

function counterPokeAnalysis(defenceResult,list){
    document.querySelector(".counterPoke").innerHTML = '';
    let weekType = [];
    for(let i = 0; i < Object.keys(defenceResult[list.length]).length; i++){
        let defence = defenceResult[list.length];
        if(defence[Object.keys(defence)[i]] > list.length){
            weekType.push(Object.keys(defence)[i]); 
        }
    }
    for(let i = 0; i < Object.keys(SPECIES_2).length; i++){
        let isWeek = false;
        for(let j = 0; j < weekType.length; j++){
            if(weekType.includes(SPECIES_2[Object.keys(SPECIES_2)[i]].types[0]) &&
            ((weekType.includes(SPECIES_2[Object.keys(SPECIES_2)[i]].types[1]) || SPECIES_2[Object.keys(SPECIES_2)[i]].types[1] == ''))){
                isWeek = true;
            }
        }
        if(isWeek){
            document.querySelector(".counterPoke").innerHTML += nameKR[Object.keys(SPECIES_2)[i]] + " / "
        }
    }
}

function upScroll(){
    window.scrollTo({top:document.querySelector(".title-text").offsetTop,behavior:'smooth'});
}