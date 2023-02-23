$(function(){
    $("legend").click(function(){
        if($(this).closest(".poke-info").attr("class") != "poke-info maximum"){
            $(this).closest(".poke-info").removeClass("minimum").addClass("maximum");
        }else{
            $(this).closest(".poke-info").removeClass("maximum").addClass("minimum");
        }
    });
});
// p1.species.otherFormes .species => 포켓몬 원본
// p1.stats 능력치
// p1.types 타입배열
// p1.teraType = $("#p1 .teraType").val(); 테라타입
function partyAnalysis(){

    let list = [];

    for(let i = 0 ; i < $(".pokemonCount").val(); i++){
        list[i] = createPokemon($(`#p${i+1}`));
        list[i].teraType = $(`#p${i+1} .teraType`).val();
    }

    let type = [];
    for(let i = 0; i < list.length; i++){
        type[i]= list[i].types
    }
    console.log(type);
}
