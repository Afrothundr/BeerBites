
var proxy = "https://cors-anywhere.herokuapp.com/"

$("#search").click(function(){
	searchBeer();

});



function searchBeer() {
        var beer = $("#search").val().trim();
        var queryURL = proxy + "https://api.brewerydb.com/v2/search?q=bud+light&type=beer&key=0191c57ff93f0b5868e91f7e67f611e7&format=json";
        
        $.ajax({
          url: queryURL,
          method: "GET",
          crossDomain: true,
          dataType: "json",
          contentType: "application/json"
        }).done(function(response) {
          console.log(beer);
          console.log(response.data[0].name);
          console.log(response.data[0].style.category.name);
        });

}

