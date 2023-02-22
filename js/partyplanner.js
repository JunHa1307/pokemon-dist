$(function(){
    $("legend").click(function(){
        if($(this).closest(".poke-info").attr("class") != "poke-info maximum"){
            $(this).closest(".poke-info").removeClass("minimum").addClass("maximum");
        }else{
            $(this).closest(".poke-info").removeClass("maximum").addClass("minimum");
        }
    });

});