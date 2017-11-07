
$('document').ready(function(){
	var proxy = "https://cors-anywhere.herokuapp.com/"
	var beerResult = null;
	var style = "";
	var label = "";
	var glassID = "";
	var callResults = [];
	var beerIndex = [];
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
	          callResults = Object.keys(response);
	          console.log(callResults);
	          console.log(callResults.length);
	          	//check to make sure search has a valid response from the api
			    if (callResults.length > 2) {
			    	beerIndex = Object.keys(response.data[0]);
			    	console.log(beerIndex);
			    	// append results to page
			        var beerDiv = $("<div>");
			       	var beerHeader = $("<h3>");
			       	var styleHeader = $("<h3>");
			       	var beerImg = $("<img>");
			       	var glassHeader = $("<h3>");

		
			    	  if (beerIndex.includes("name")) {
			    	  	//Get Beer Name and add it to Header
					    beerResult = response.data[0].name;
					    beerHeader.html(beerResult);
					    beerHeader.addClass("beerinfo");
					    } if (beerIndex.includes("style")) {
					    	//Get Style and add to header
				            style = response.data[0].style.shortName;
				            styleHeader.html(style);
				            styleHeader.addClass("beerinfo");
				           } if (beerIndex.includes("labels")) {
				           	  //Get label and add it to image
				        	  label = response.data[0].labels.medium;
				        	  beerImg.attr("src", label);
			       			  beerImg.addClass("beer-img");
				        	} if (beerIndex.includes("glasswareId")) {
				        		//Add Glass picture and info
				        	    glassID = response.data[0].glasswareId;
				        	    glassHeader.html(glassware[glassID - 1].name);
				        	    glassHeader.addClass("beerinfo");
			       				$("#glass-image").attr("src", glassware[glassID - 1].picture);
				        	  };
			    
			       	beerDiv.append(beerHeader, styleHeader, beerImg);

			       	$("#beer-results").empty();
			       	$("#beer-results").append(beerDiv);
			       	$("#glass-results").prepend(glassHeader);

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
		 $(".beerbtn").on("click", function searchbeerBtn() {
	        event.preventDefault();       
	        var beer = $(this).text().trim();
	        console.log(beer);
	        var queryURL = proxy + "https://api.brewerydb.com/v2/search?q=" + beer + "&type=beer&key=0191c57ff93f0b5868e91f7e67f611e7&format=json";

	        $.ajax({
	          url: queryURL,
	          method: "GET",
	          crossDomain: true,
	          dataType: "json",
	          contentType: "application/json"
	        }).done(function(response) {
	          callResults = Object.keys(response);
	          console.log(callResults);
	          console.log(callResults.length);
	          	//check to make sure search has a valid response from the api
			    if (callResults.length > 2) {
			    	beerIndex = Object.keys(response.data[0]);
			    	console.log(beerIndex);
			    	// append results to page
			        var beerDiv = $("<div>");
			       	var beerHeader = $("<h3>");
			       	var styleHeader = $("<h3>");
			       	var beerImg = $("<img>");
			       	var glassHeader = $("<h3>");

		
			    	  if (beerIndex.includes("name")) {
			    	  	//Get Beer Name and add it to Header
					    beerResult = response.data[0].name;
					    beerHeader.html(beerResult);
					    beerHeader.addClass("beerinfo");
					    } if (beerIndex.includes("style")) {
					    	//Get Style and add to header
				            style = response.data[0].style.shortName;
				            styleHeader.html(style);
				            styleHeader.addClass("beerinfo");
				           } if (beerIndex.includes("labels")) {
				           	  //Get label and add it to image
				        	  label = response.data[0].labels.medium;
				        	  beerImg.attr("src", label);
			       			  beerImg.addClass("beer-img");
				        	} if (beerIndex.includes("glasswareId")) {
				        		//Add Glass picture and info
				        	    glassID = response.data[0].glasswareId;
				        	    glassHeader.html(glassware[glassID - 1].name);
				        	    glassHeader.addClass("beerinfo");
			       				$("#glass-image").attr("src", glassware[glassID - 1].picture);
				        	  };
			    
			       	beerDiv.append(beerHeader, styleHeader, beerImg);

			       	$("#beer-results").empty();
			       	$("#beer-results").append(beerDiv);
			       	$("#glass-results").prepend(glassHeader);

			       	//Show Results page
			       	$("#start-screen").css("display", "none");
				    $("#results-screen").css("display", "block");

			          console.log(beer);
			          console.log(beerResult);
			          console.log(style);
				};
	        });
	});
});


