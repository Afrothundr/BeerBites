
$('document').ready(function(){
	var proxy = "https://cors-anywhere.herokuapp.com/"
	var beerResult = null;
	var style = "";
	var label = "";
	var glassID = "";
	var callResults = [];
	var beerIndex = [];
  var dishesImgUrls = [];
  var recipeUrls = [];
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

  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA1q-yWVD1cjH64Kqtcy1glm0mLxnij9lE",
    authDomain: "beerdb-d39e4.firebaseapp.com",
    databaseURL: "https://beerdb-d39e4.firebaseio.com",
    projectId: "beerdb-d39e4",
    storageBucket: "beerdb-d39e4.appspot.com",
    messagingSenderId: "455037721802"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

	$("#searchpic").click(function(){
		searchBeer();
	});

	$("#searchAgain").click(function(){
		$("#start-screen").css("display", "block");
		$("#results-screen").css("display", "none");
		$("input[type=text], textarea").val("");
		$(".beerinfo").remove();
	})

	// add enter button submit capabilities
	$(document).keypress(function(e) {
		 if(e.which == 13 && $("#form1").val().trim() !== ""){//Enter key pressed
            $('#searchpic').click();//Trigger search button click event
        }
    });


	function getFoodPairing(){
    var dishesArray = [];
    var searchFood;
    style = style.toLowerCase();
    console.log(style);
    
    console.log("Database reference: " + database.ref());

    database.ref().on('value', function(snapshot){          
  	  //get food pairing
      searchFood = snapshot.val()[style];
      console.log(searchFood);

    });//end of database.ref()

	var queryUrl = "https://api.yummly.com/v1/api/recipes?_app_id=7a03c2e6&_app_key=ee6cb6cfac34db8059806a0aeb1b2c42&q=" + searchFood;
	console.log(queryUrl);

		$.ajax({
				url: queryUrl,
				method: "GET"
		}).done(function(response){

		console.log(response.matches);
        for (var i = 0; i < 3; i++){
          dishesArray.push(response.matches[i].id); 
 //          // console.log("DISHES ARRAY: " + dishesArray[i]);

 //          // var dishesQueryUrl = "https://api.yummly.com/v1/api/recipe/" + dishesArray[i] + 
 //          // "?_app_id=7a03c2e6&_app_key=ee6cb6cfac34db8059806a0aeb1b2c42";
 //          // console.log("Recipe Img URL: " + dishesQueryUrl);

          dishesImgUrls.push(response.matches[i].images[0].hostedLargeUrl);
          // console.log(response.images[0].hostedLargeUrl);
          recipeUrls.push(response.attribution.url);

 //    //       $.ajax({
 //    //     url: dishesQueryUrl,
 //    //     method: "GET"
 //    // }).done(function(response){
 //    //     // console.log(response);
 //    //     dishesImgUrls.push(response.images[0].hostedLargeUrl);
 //    //     // console.log("Image URL: " + dishesImgUrls[0]);
 //    //     console.log(response.images[0].hostedLargeUrl)
 //    //     recipeUrls.push(response.attribution.url);
 //    //     // console.log("Recipe URL: " + recipeUrls[0]);
 //    //  // $("div.recipe-displays div img").attr("src", dishesImgUrls[0]);

 //    //   });//end of inner ajax call

        }//end for
		
		console.log(dishesArray);
		console.log(dishesImgUrls);
		console.log(recipeUrls);
	// 	// var recipeSlide = $("<div>");
 //  //       var recipeSlideImg = $("<img>");
 //  //       recipeSlideImg.attr("src", response.images[0].hostedLargeUrl);
 //  //       recipeSlideImg.wrap("<a href='"+ recipeUrls[0] + "' </a>");
 //  //       recipeSlide.append(recipeSlideImg);
 //  //       $("#recipe-displays").append(recipeSlide);	
				
			
			});//end of ajax call 

}//end of getFoodPairing()


	function searchBeer() {
	        event.preventDefault();
          style = "american light lager";
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
				            style = response.data[0].style.name;
				            styleHeader.html(style);

             				getFoodPairing();

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
			       //	Show Results page
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
			//preselected beer button click
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
				    console.log(response.data[0].abv);
			    	// declare html variables
			        var beerDiv = $("<div>");
			       	var beerHeader = $("<h3>");
			       	var styleHeader = $("<h3>");
			       	var beerImg = $("<img>");
			       	var glassHeader = $("<h3>");
			       	var beerTempDisplay = $("<h3>");


			    	  if (beerIndex.includes("name")) {
			    	  	//Get Beer Name and add it to Header
					    beerResult = response.data[0].name;
					    beerHeader.html(beerResult);
					    beerHeader.addClass("beerinfo");
					    } if (beerIndex.includes("style")) {
					    	//Get Style and add to header
				            style = response.data[0].style.name;
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
			       	$("#glass-results").prepend(glassHeader, beerTempDisplay);

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


