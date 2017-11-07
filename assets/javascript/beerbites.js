$('document').ready(function(){
	var proxy = "https://cors-anywhere.herokuapp.com/"
	var beerResult = null;
	var style = "";
	var label = "";
	var glassID = "";
	var callResults = [];
	//glassware object array
	var glassware = [
	{ id: '1',
	  name: "Flute",
	  picture: "../images/flute.png"
		},
	{ id: '2',
	  name: "Goblet",
	  picture: "assets/images/goblet.png"
		},
	{ id: '3',
	  name: "Mug",
	  picture: "assets/images/mug.png"
		},
	{ id: '4',
	  name: "Pilsner",
	  picture: "assets/images/pilsner.png"
		},
	{ id: '5',
	  name: "Pint",
	  picture: "assets/images/pint.png"
		},
	{ id: '6',
	  name: "Snifter",
	  picture: "assets/images/snifter.png"
		},
	{ id: '7',
	  name: "Stange",
	  picture: "assets/images/stange.png"
		},
	{ id: '8',
	  name: "Tulip",
	  picture: "assets/images/tulip.png"
		},
	{ id: '9',
	  name: "Weizen",
	  picture: "assets/images/weizen.png"
		},
	{ id: '10',
	  name: "Oversized Wine Glass",
	  picture: "assets/images/wine.png"
		},
	{'11': ""},
	{'12': ""},
	{ id: '13',
	  name: "Willi",
	  picture: "assets/images/willi.png"
		},
	{ id: '14',
	  name: "Thistle",
	  picture: "assets/images/thistle.png"
		},
	];

	$("#searchpic").click(function(){
		searchBeer();
	});

	// add enter button submit capabilities
	$(document).keypress(function(e) {
		 if(e.which == 13 && $("#form1").val().trim() !== ""){//Enter key pressed
            $('#searchpic').click();//Trigger search button click event
        }
    });




	function getFoodPairing(){

    var searchFood = database.ref(style.toLowerCase());
    console.log("Food to search in API: " + searchFood);
		//var searchFood = "grilled meats";
		var queryUrl = "https://api.yummly.com/v1/api/recipes?_app_id=7a03c2e6&_app_key=ee6cb6cfac34db8059806a0aeb1b2c42&q=" 
			+ searchFood;

		// $.ajax({
		// 		url: queryUrl,
		// 		method: "GET"
		// }).done(function(response){
		// 		var results = response.data;
		// 		console.log(response);
			
		// 	});//end of ajax call 

	}//end of getFoodPairing()

	 //getFoodPairing();



	function searchBeer() {
	        event.preventDefault();
	        var beer = $("#form1").val().trim();
	        var queryURL = proxy + "https://api.brewerydb.com/v2/search?q=" + beer + "&type=beer&key=0191c57ff93f0b5868e91f7e67f611e7&format=json";

	        $.ajax({
	          url: queryURL,
	          method: "GET",
	          crossDomain: true,
	          dataType: "json",
	          contentType: "application/json"
	        }).done(function(response) {
	          callResults = Object.keys(response).length;
	          console.log(callResults);
	          	//check to make sure search has a valid response from the api
			    if (callResults > 2) {
			    beerResult = response.data[0].name;
		        style = response.data[0].style.shortName;
		        label = response.data[0].labels.medium;
		        glassID = response.data[0].glasswareId;
			    	// append results to page
			        var beerDiv = $("<div>");
			       	var beerHeader = $("<h3>");
			       	var styleHeader = $("<h3>");
			       	var beerImg = $("<img>");
			       	var glassHeader = $("<h3>");
              
			       	beerHeader.html(beerResult);
			       	beerImg.attr("src", label);
			       	beerImg.addClass("beer-img");
			       	styleHeader.html(style);
			       	beerDiv.append(beerHeader, beerImg, styleHeader);
			       	$("#beer-results").empty();
			       	$("#beer-results").append(beerDiv);

			       	//Add Glass picture and info
			       	glassHeader.html(glassware[glassID - 1].name);
			       	$("#glass-image").attr("src", glassware[glassID - 1].picture);
			       	$("#glass-results").prepend(glassHeader);
              getFoodPairing();
			       	//Show Results page
			       	$("#start-screen").css("display", "none");
				    $("#results-screen").css("display", "block");

			          console.log(beer);
			          console.log(beerResult);
			          console.log(style);
				} else {
			      //Alert user to pick another beer
					console.log("not a beer...");
					$("#main").html("Try Picking Another Beer");

	        	};
	        });
	}
});

