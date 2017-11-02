// function searchBeer() {

//         var beer = $(this).attr("data-name");
//         var queryURL = "https://api.brewerydb.com/v2/search?q=" + "bud+light" + "&type=beer&key=0191c57ff93f0b5868e91f7e67f611e7&format=json
// ";

//         // Creates AJAX call for the specific movie button being clicked
//         $.ajax({
//           url: queryURL,
//           method: "GET"
//         }).done(function(response) {
//           console.log(response)
//         };

// }




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

getFoodPairing();