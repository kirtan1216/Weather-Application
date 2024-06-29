let CityInput = document.getElementById("SearchCitytext");
let SearchButton = document.getElementById("SearchButton");
let DisplayCity = document.getElementsByClassName("city-name")[0];
let DisplayTemperature = document.getElementsByClassName("city-temparature-text")[0];
let titles = document.getElementsByClassName("titles");
let obs = document.getElementsByClassName("observation");
let imgCondition = document.getElementById("img-condition");


// http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}&aqi=no
const BaseURL = "http://api.weatherapi.com/v1/current.json?key=46122bfca2404410a8190215242806";

setInterval(()=>{
    if(CityInput.value != 0){
        SearchButton.disabled = false;
    }else{
        SearchButton.disabled = true;
    }
},300);

async function CurrentWeatherUpdate () {
    let CityName = CityInput.value;

    let response = await fetch(`${BaseURL}&q=${CityName}&aqi=no`);
    console.log(response);
    let data = await response.json();
    

    console.log(data);
    DisplayCity.innerHTML = `${data['location']['name']}`
    DisplayTemperature.innerHTML = `${data['current']['temp_c']}<sup>o</sup>`
    obs[0].innerHTML =  `${data['current']['uv']}`;
    obs[1].innerHTML =  `${data['current']['humidity']}`;   
    obs[2].innerHTML =  `${data['current']['feelslike_c']}<sup>o</sup>`;
    obs[3].innerHTML =  `${data['current']['wind_kph']} kph`;
    obs[4].innerHTML =  `${data['current']['pressure_mb']} mbar`;
    let imgURL = data['current']['condition']['icon'];

    document.getElementById("img-condition").src = `https:${imgURL}`    
}




SearchButton.addEventListener("click" , CurrentWeatherUpdate);