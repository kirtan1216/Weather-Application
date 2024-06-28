let CityInput = document.getElementById("SearchCitytext");
let SearchButton = document.getElementById("SearchButton");
let DisplayCity = document.getElementsByClassName("city-name")[0];
let DisplayTemperature = document.getElementsByClassName("city-temparature")[0];

// http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}&aqi=no
const BaseURL = "http://api.weatherapi.com/v1/current.json?key=46122bfca2404410a8190215242806";

setInterval(()=>{
    if(CityInput.value != 0){
        SearchButton.disabled = false;
    }else{
        SearchButton.disabled = true;
    }
},300);

async function UpdateWeather () {
    let CityName = CityInput.value;
    console.log(CityName);

    let response = await fetch(`${BaseURL}&q=${CityName}&aqi=no`);
    console.log(response);

    let data = await response.json();
    console.log(data);
    console.log(data['current']['temp_c']);
}




SearchButton.addEventListener("click" , UpdateWeather);