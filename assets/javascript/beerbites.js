
var proxy = "https://cors-anywhere.herokuapp.com/"


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


$("#search").click(function(){
	searchBeer();


});



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
          console.log(beer);
          console.log(response.data[0].name);
          console.log(response.data[0].style.shortName);
        });

}

