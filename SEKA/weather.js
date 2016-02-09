function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadWeather);
    } else {
       alert("Geolocation");
    }
}
function loadWeather(position) {
    var key = 'f322646f7df8f879';


    var Weather = "https://api.wunderground.com/api/"+ key +"/forecast/geolookup/conditions/q/" + position.coords.latitude + "," + position.coords.longitude  + ".json";

    $.ajax({
        url: Weather,
        dataType: "jsonp",
        success: function (data) {
            var location = data['location']['city'];
            var temp = data['current_observation']['temp_c'];
            var img = data['current_observation']['icon_url'];
            var desc = data['current_observation']['weather'];
            var windDir = data['current_observation']['wind_dir'];
            var windSpeed=data['current_observation']['wind_kph'];

            //setting the spans to the correct parameters
            $('#location').html(location);
            $('#temp').html(temp);
            $('#desc').html(desc);
            $('#wind').html('From the '+windDir+' at '+windSpeed+' KM/H');
//filling the image src attribute with the image url
            $('#img').attr('src', img);
            }
    });
}