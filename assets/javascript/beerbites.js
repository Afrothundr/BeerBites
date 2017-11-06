
var proxy = "https://cors-anywhere.herokuapp.com/"
var beerResult = "";
var style = "";
// var foodPairings {
// 	"American-Style Pale Ale"
// 	'Fresh "Wet" Hop Ale'
// 	'Pale American-Belgo-Style Ale'
// 	'Dark American-Belgo-Style Ale'
// 	'American-Style Strong Pale Ale'
// 	'American-Style India Pale Ale'
// 	'Imperial or Double India Pale Ale'
// 	'American-Style Amber/Red Ale'
// 	'Imperial Red Ale'
// 	'American-Style Barley Wine Ale'
// 	'American-Style Wheat Wine Ale'
// 	'Golden or Blonde Ale'
// 	'American-Style Brown Ale'
// 	'Smoke Porter'
// 	'American-Style Sour Ale'
// 	'American-Style Black Ale'
// 	'American-Style Stout'
// 	'American-Style Imperial Stout'
// 	'Specialty Stouts'
// 	'American-Style Imperial Porter'
// 	'Session India Pale Ale'

// };



$("#searchpic").click(function(){
	searchBeer();
  $("#start-screen").css("display", "none");
  $("#results-screen").css("display", "block");


});

function getFoodPairing(){

	var searchFood = "grilled meats";
	var queryUrl = "https://api.yummly.com/v1/api/recipes?_app_id=7a03c2e6&_app_key=ee6cb6cfac34db8059806a0aeb1b2c42&q=" 
		+ searchFood;

	$.ajax({
			url: queryUrl,
			method: "GET"
	}).done(function(response){
			var results = response.data;
			console.log(response);
		
		});//end of ajax call 

}//end of getFoodPairing()

// getFoodPairing();


function searchBeer() {
        var beer = $("#form1").val().trim();
        var queryURL = proxy + "https://api.brewerydb.com/v2/search?q=" + beer + "&type=beer&key=0191c57ff93f0b5868e91f7e67f611e7&format=json";

        $.ajax({
          url: queryURL,
          method: "GET",
          crossDomain: true,
          dataType: "json",
          contentType: "application/json"
        }).done(function(response) {
          beerResult = response.data[0].name;
          style = response.data[0].style.shortName;
        // append results to page
        var beerDiv = $("<div>");
       	var beerHeader = $("<h3>");
       	var styleHeader = $("<h3>");

       	beerHeader.html(beerResult);
       	styleHeader.html(style);
       	beerDiv.append(beerHeader, styleHeader);
       	$("#results").append(beerDiv);

          console.log(beer);
          console.log(beerResult);
          console.log(style);
        });

}

