var villainArray = ["Joker", "Negan", "Voldemort", "Kylo Ren", "Freddy Krueger", "Palpatine", "Sauron", "Hannibal Lecter", "Darth Vader", "Loki", "Jason Voorhees", "Agent Smith", "Magneto", "Scar", "Bane", "Predator", "Pennywise", "Jigsaw", "Davy Jones", "Bellatrix Lestrange", "Maleficent", "Dr. Evil", "Megatron", "Lex Luthor"];


//Button creator 
function buttonCreator() {

    $("#linkSection").empty();

    var main = $("#topSection");

    var btns = main.find("#linkSection");

    for(i = 0; i < villainArray.length; i++) {
        var villainBtn = $("<button>");
        villainBtn.addClass("btn btn-default villainBtn");
        villainBtn.attr("data-villain", villainArray[i]);
        villainBtn.text(villainArray[i]);
        btns.append(villainBtn);
    }
    clickMe();
}

// Play pause click event 

function playPause() {
    $(".vImage").on("click", function() {

        var state = $(this).attr("state");

        if (state === "pause") {
            $(this).attr("src", $(this).attr("play"));
            $(this).attr("state", "play");
        }
        else {
            $(this).attr("src", $(this).attr("pause"));
            $(this).attr("state", "pause");
        }
    })
}

//ajax call 
function clickMe () {
    $(".villainBtn").on("click", function(){
        var villain = $(this).data("villain");
        var vLimit = "&limit=10"
        var apiKey = "&api_key=YWq0JeKUpCNYNzFC0ussbsqrj1wviR5a"
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ villain + 
            apiKey + vLimit;
        
        $.ajax({
            url: queryURL, 
            method: "GET",
        })
            .done(function(response){
                for(j =0; j < response.data.length; j++){

                    var villainDiv = $("<div class = 'col-md-3'>");
                    var vRating = $("<p>").text("Rating: " + (response.data[j].rating).toUpperCase());

                    var villainImage = $("<img>");
                    villainImage.addClass("vImage");


                    //Add play state attribute
                    var play = villainImage.attr("src", response.data[j].images.original.url);
                    villainImage.attr("play", response.data[j].images.original.url);

                    var pause = villainImage.attr("src", response.data[j].images.original_still.url);
                    villainImage.attr("pause", response.data[j].images.original_still.url);

                    villainImage.attr("state", "pause");
                    //Set uniform size
                    villainImage.attr("height", "200");
                    villainImage.attr("width", "200");
                    
                    villainDiv.append(vRating);
                    villainDiv.append(villainImage);
                    $("#imageSection").prepend(villainDiv);

                }

                playPause();
            })
        playPause();
    })
}




function buttonAdder () {
    $("#adder").on("click", function(event) {  
        event.preventDefault();
        var villain = $("#addVillain").val();
        villainArray.push(villain);
        buttonCreator();
        $("#addVillain").val("");

    })
}


$(document).ready(function() {
    buttonCreator();
    buttonAdder();
  });