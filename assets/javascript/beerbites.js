
$('document').ready(function(){
	$("#searchAgain").css("display", "none");
	var proxy = "https://arcane-lake-48943.herokuapp.com/"
	var beerResult = null;
	var style = "";
	var label = "";
	var glassID = "";
	var callResults = [];
	var beerIndex = [];
	var dishesImgUrls = [];
	var recipeUrls = [];
    var searchFood = "";
    var idMatch = ["#recipe-1", "#recipe-2", "#recipe-3"];
    var titleMatch =["#title-1", "#title-2", "#title-3"];
    var linkMatch = ["#border-1", "#border-2", "#border-3"];
    var enterKeyCounter = 0;
    var searchButtonCounter = 0;
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

	];//end of glassware object  


// recipe next button
	var nextCounter = 1
	var activeRecipe = "border-" + nextCounter
	$("#next-button").click(function(){
		if(nextCounter < 3){
		$("#border-" + nextCounter).css("display", "none");
		nextCounter++;
		$("#border-" + nextCounter).css("display", "block");
		}

		else if( nextCounter === 3){
			$("#border-1").css("display", "block");
			$("#border-2").css("display", "none");
			$("#border-3").css("display", "none");
			nextCounter = 1;
		}
	})


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA1q-yWVD1cjH64Kqtcy1glm0mLxnij9lE",
    authDomain: "beerdb-d39e4.firebaseapp.com",
    databaseURL: "https://beerdb-d39e4.firebaseio.com",
    projectId: "beerdb-d39e4",
    storageBucket: "beerdb-d39e4.appspot.com",
    messagingSenderId: "455037721802"
  };//end of database config
  firebase.initializeApp(config);

  //Reference to database
  var database = firebase.database();

  //Click event for search button
	$("#searchpic").click(function(){
	searchButtonCounter++;
	// check to make sure submit was only hit once
		if (searchButtonCounter < 2) {
		searchBeer();
	}; 
	});//end of event

  //Click event for Search Another Beer button
	$("#searchAgain").click(function(){
		$("#start-screen").css("display", "block");
		$("#results-screen").css("display", "none");
		$("input[type=text], textarea").val("");
		$(".beerinfo").remove();
    $(".beerbtn").removeAttr("disabled");
    $("#form1").prop("disabled", false);$(".beerbtn").removeAttr("disabled");
    $("#form1").prop("disabled", false);
    $("#searchAgain").css("display", "none");
    enterKeyCounter = 0;
    searchButtonCounter = 0;
	});//end of event



	//Add enter button submit capabilities
	$(document).keypress(function(e) {
		 if(e.which == 13 && $("#form1").val().trim() !== "" && enterKeyCounter < 1){//Enter key pressed
            $("#form1").prop("disabled", true);
            searchBeer();//Trigger search beer function
            enterKeyCounter++;
        }
  });//end of event

  /*getFoodPairing(): Queries the firebase database to get the recipe search string
  //based on the beer style received from the searchBeer() call.  Then it makes two ajax calls 
  //to the yummly API to retrieve recipes information.*/
	function getFoodPairing(){
    
    var dishesArray = [];
    style = style.toLowerCase();
    $(".recipe-contents").empty();

    database.ref().on('value', function(snapshot){

      var counter = 0;
      searchFood = snapshot.val()[style];
      var queryUrl = "https://api.yummly.com/v1/api/recipes?_app_id=7a03c2e6&_app_key=ee6cb6cfac34db8059806a0aeb1b2c42&q="
       + searchFood;
	    
      /*First ajax call to the Yummly API to get the dishes id required to get the 
      //detailed information for the recipes*/  
  		$.ajax({
  				url: queryUrl,
  				method: "GET"
  		}).done(function(response){

        /*Gets the id for the first three recipes.  Makes second call to API to get the
        //the image url and recipes' urls.  Dynamically displays the information*/
        for (var i = 0; i < 3; i++){

          dishesArray.push(response.matches[i].id); 
          var dishesQueryUrl = "https://api.yummly.com/v1/api/recipe/" + dishesArray[i] + 
          "?_app_id=7a03c2e6&_app_key=ee6cb6cfac34db8059806a0aeb1b2c42";


          $.ajax({
            url: dishesQueryUrl,
            method: "GET"
   		    }).done(function(response){
        
            dishesImgUrls.push(response.images[0].hostedLargeUrl);
            recipeUrls.push(response.attribution.url);
		        
            //Append recipes results to page
     	      var recipeSlide = $("<div>");
            var recipeSlideImg = $("<img>");
            
            recipeSlideImg.attr("src", response.images[0].hostedLargeUrl);        
            recipeSlide.append(recipeSlideImg);
            
            $(idMatch[counter]).append(recipeSlide);
            $(titleMatch[counter]).html(response.name);
            $(linkMatch[counter]).attr("href", response.attribution.url);
        
            counter++;

          });//end of inner ajax call
        }//end for			
			});//end of ajax outer call 
    });//end of database.ref()
  }//end of getFoodPairing()

  /*searchBeer(): Makes the call to the beer API based on the beer name provided by the user.
  //Displays the beer information.  Retrieves the style of the beer and calls the getFoodPairing()*/
	function searchBeer() {

	 event.preventDefault();
	 
   var beer = $("#form1").val().trim();
	 var queryURL = proxy + "https://api.brewerydb.com/v2/search?q=" + 
    beer + "&type=beer&key=0191c57ff93f0b5868e91f7e67f611e7&format=json";

	 $.ajax({
	   url: queryURL,
	   method: "GET",
	   crossDomain: true,
	   dataType: "json",
	   contentType: "application/json"
	 }).done(function(response) {
	   callResults = Object.keys(response);
	          
	    //Check to make sure search has a valid response from the Beer API
		  if (callResults.length > 2) {

			 beerIndex = Object.keys(response.data[0]);
			 
       //Append beer's results to page
			 var beerDiv = $("<div>");
			 var beerHeader = $("<h3>");
			 var styleHeader = $("<h3>");
			 var beerImg = $("<img>");
			 var glassHeader = $("<h3>");
			 var beerTempDisplay = $("<h3>");

			 if (beerIndex.includes("name")) {

			    //Get Beer name and adds it to Header
					beerResult = response.data[0].name;
					beerHeader.html(beerResult);
					beerHeader.addClass("beerinfo");

			 } //end of if statement
       if (beerIndex.includes("style")) {
					
          //Get Style and add to header
				  style = response.data[0].style.name;
            
            /*Determines if the beer style contains a '/', 
            //takes the first part of the style string.*/
            if(style.includes("/")){

              var position = style.indexOf("/");              
              style = style.substring(0,position);
                      
            }//end of if

				  styleHeader.html(style);

          //Call to get the recipes' information based on the beer style.
          getFoodPairing();

				  styleHeader.addClass("beerinfo");

				} //end of if
        if (beerIndex.includes("labels")) {

				  //Get label and add it to image
				  label = response.data[0].labels.medium;
				  beerImg.attr("src", label);
			    beerImg.addClass("beer-img");

				} //end of if
        if (beerIndex.includes("glasswareId")) {

				  //Add Glass picture and info
				  glassID = response.data[0].glasswareId;
				  glassHeader.html(glassware[glassID - 1].name);
				  glassHeader.addClass("beerinfo");
          $("#glass-image").attr("src", glassware[glassID - 1].picture);
				        	  
        } //end of if statement
        if (beerIndex.includes("servingTemperatureDisplay")) {
				        	  	
          var beerTemp = "Served: " + response.data[0].servingTemperatureDisplay;
				  beerTempDisplay.html(beerTemp);
				  beerTempDisplay.addClass("beerinfo");
				};//end of if statement
			  
		if (label == "") {
			beerImg.attr("src", "assets/images/no-label.png");
			beerImg.addClass("beer-img");
			beerImg.css("width", "200px");
		}; 
			  beerDiv.append(beerHeader, styleHeader, beerImg);
			  $("#beer-results").empty();
			  $("#beer-results").append(beerDiv);
			  $("#glass-results").prepend(glassHeader, beerTempDisplay);
			  //	Show Results page
			  $("#start-screen").css("display", "none");
			  $("#results-screen").css("display", "block");
			  $("#searchAgain").css("display", "inline-block");
			
      //If it is not a valid beer
      } else {
			 //Alert user to pick another beer	
        $("#form1").prop("disabled",false);		
		$("#main").html("Try Picking Another Beer");
		enterKeyCounter = 0;
		searchButtonCounter = 0;
	    };//end of else statement
	 });//end of ajax call
	}//end of searchBeer()

	//Pre-selected beer buttons click event
	$(".beerbtn").on("click", function searchbeerBtn() {
	
    event.preventDefault();       
	  $(".beerbtn").attr("disabled", "disabled");
    
    var beer = $(this).text().trim();
	  var queryURL = proxy + "https://api.brewerydb.com/v2/search?q=" + 
      beer + "&type=beer&key=0191c57ff93f0b5868e91f7e67f611e7&format=json";

	  $.ajax({

	   url: queryURL,
	   method: "GET",
	   crossDomain: true,
	   dataType: "json",
	   contentType: "application/json"

	  }).done(function(response) {

	    callResults = Object.keys(response);

     	//check to make sure search has a valid response from the api
	    if (callResults.length > 2) {
	    	beerIndex = Object.keys(response.data[0]);
			 
       //Declare html variables
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
				} //end of if statement
        if (beerIndex.includes("style")) {
					    	
            //Get Style and add to header
				    style = response.data[0].style.name;
				    
            /*Determines if the beer style contains a '/', 
            //takes the first part of the style string.*/
            if(style.includes("/")){

              var position = style.indexOf("/");              
              style = style.substring(0,position);
                      
            }//end of if

            //Call to get the recipes' information based on the beer style.
				    getFoodPairing();

				    styleHeader.html(style);
				    styleHeader.addClass("beerinfo");
				} //end of if statement
        if (beerIndex.includes("labels")) {

				  //Get label and add it to image
				  label = response.data[0].labels.medium;
				  beerImg.attr("src", label);
			    beerImg.addClass("beer-img");
			  } //end of if statement
        if (beerIndex.includes("glasswareId")) {

				  //Add Glass picture and info
				  glassID = response.data[0].glasswareId;
				  glassHeader.html(glassware[glassID - 1].name);
				  glassHeader.addClass("beerinfo");

			   $("#glass-image").attr("src", glassware[glassID - 1].picture);
				} //end of if statement
        if (beerIndex.includes("servingTemperatureDisplay")) {
				  var beerTemp = "Served: " + response.data[0].servingTemperatureDisplay;
				  beerTempDisplay.html(beerTemp);
				  beerTempDisplay.addClass("beerinfo");
				};			    
			 
        beerDiv.append(beerHeader, styleHeader, beerImg);

			  $("#beer-results").empty();
			  $("#beer-results").append(beerDiv);
			  $("#glass-results").prepend(glassHeader, beerTempDisplay);

			 //Show Results page
			  $("#start-screen").css("display", "none");
			  $("#results-screen").css("display", "block");
			  $("#searchAgain").css("display", "inline-block");
			};//end of outer if statement
	 });//end of ajax call
	});//end of pre-selected beer button event
});//end $('document').ready