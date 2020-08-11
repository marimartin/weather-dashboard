
// // API Key
// var APIKey = "166a433c57516f51dfab1f7edaed8413";

// // City Name
// var cityName = $("#city-input").val().trim();


// // Build queryURL
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + cityName + "&appid=" + APIKey;

// console.log(queryURL)
// // Ajax call
// $.ajax({
//     url: queryURL,
//     method: "GET"
// })

var APIKey = "166a433c57516f51dfab1f7edaed8413";

function searchWeather(inputCity) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "," + inputCity + "&appid=" + APIKey;

    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Printing the entire object to console
        console.log(response);

        // Constructing HTML containing the artist information
        var artistName = $("<h1>").text(response.name);
        var artistURL = $("<a>").attr("href", response.url).append(artistName);
        var artistImage = $("<img>").attr("src", response.thumb_url);
        var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
        var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
        var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

        // Empty the contents of the artist-div, append the new artist content
        $("#artist-div").empty();
        $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    });
}

// Event handler for user clicking the select-artist button
$("#submit-city").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputCity = $("#city-input").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchWeather(inputCity);
});