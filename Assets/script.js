// API Key
var APIKey = "166a433c57516f51dfab1f7edaed8413";

$("#five-day").hide();

function searchWeather(inputCity) {

    // Build queryURL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "," + inputCity + "&appid=" + APIKey;

    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var iconCode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

        console.log(response);

        // Add content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".weather-icon").attr("src", iconURL);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".wind").text("Wind Speed: " + response.wind.speed);

        // Convert temp to F
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // Add temp to HTML
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));


    });
}

// Event handler for user clicking the search button
$("#submit-city").on("click", function (event) {
    event.preventDefault();
    // Storing the city name
    var inputCity = $("#city-input").val().trim();

    var cityButton = $("<button>");
    cityButton.addClass("city-btn");
    cityButton.text(inputCity);

    $("#buttons-div").append(cityButton);

    // Run searchWeather
    searchWeather(inputCity);

    // Run fiveDay
    fiveDay(inputCity);
});

$("body").on("click", ".city-btn", function (event) {
    console.log(event.target.textContent)
    searchWeather(event.target.textContent);
    fiveDay(event.target.textContent);
})

// Five Day
function fiveDay(inputCity) {
    var fivedayqueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputCity + "&appid=" + APIKey;

    $("#five-day").show();

    $.ajax({
        url: fivedayqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(fivedayqueryURL);

        var fiveDayBlocks = $(".five-day-block").empty();

        response.list.map(function (listItem, index) {
            listItem
            console.log(moment.unix(listItem.dt).format("L"))
            var $fiveDayDate = $("<p>").text(moment.unix(listItem.dt).format("L"));

            var fiveDayIconCode = listItem.weather[0].icon;
            var fiveDayIconURL = "http://openweathermap.org/img/wn/" + fiveDayIconCode + "@2x.png";
            var $fiveDayIcon = $("<img>").attr("src", fiveDayIconURL);

            var fiveDayTempF = (listItem.temp.max - 273.15) * 1.80 + 32;
            var $fiveDayTemp = $("<p>").text("Temperature: " + fiveDayTempF.toFixed(0) + "F");

            var fiveDayHumidity = (listItem.humidity);
            var $fiveDayHumidity = $("<p>").text(fiveDayHumidity + "%");

            fiveDayBlocks.eq(index).append($fiveDayDate, $fiveDayIcon, $fiveDayTemp, $fiveDayHumidity);
        })
    });
}
