const CityInput = document.getElementById("SearchCitytext");
const SearchButton = document.getElementById("SearchButton");
const DisplayCity = document.getElementsByClassName("city-name")[0];
const DisplayTemperature = document.getElementsByClassName("city-temparature-text")[0];
const titles = document.getElementsByClassName("titles");
const observation = document.getElementsByClassName("observation");
const imgCondition = document.getElementById("img-condition");
const ListItems = document.getElementsByClassName("listitems")[0];
const Vanish = document.getElementsByClassName("vanish")[0];

// http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}&aqi=no
const BaseURL = "http://api.weatherapi.com/v1/current.json?key=46122bfca2404410a8190215242806";

function SelectInput(keyword){
    CityInput.value = keyword.innerHTML;
    ListItems.innerHTML = '';
    CurrentWeatherUpdate();
    Vanish.hidden = false;
}

function DisplayList(result){
    let DisplayContent = result.map((keyword) => {
        return `<li onclick=SelectInput(this)>` + keyword + `</li>`
    });

    ListItems.innerHTML = `<ul> ` + DisplayContent.join("") + `</ul>`;
    
}

CityInput.onkeyup = function(){
    Vanish.hidden = true;
    console.log('inside the function');
    let input = CityInput.value;
    console.log(input);
    let result = [];
    if(input.length){
        console.log('inside if');
        result = indianCities.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });

        DisplayList(result);
    }else{
        ListItems.innerHTML = "";
    }
}


async function CurrentWeatherUpdate () {
    Vanish.hidden = false;
    let CityName = CityInput.value;

    let response = await fetch(`${BaseURL}&q=${CityName.toLowerCase()}&aqi=no`);
    console.log(response);
    let data = await response.json();
    

    console.log(data);
    DisplayCity.innerHTML = `${data['location']['name']}`
    DisplayTemperature.innerHTML = `${data['current']['temp_c']}<sup>o</sup>`
    observation[0].innerHTML =  `${data['current']['uv']}`;
    observation[1].innerHTML =  `${data['current']['humidity']}`;   
    observation[2].innerHTML =  `${data['current']['feelslike_c']}<sup>o</sup>`;
    observation[3].innerHTML =  `${data['current']['wind_kph']} kph`;
    observation[4].innerHTML =  `${data['current']['pressure_mb']} mbar`;
    let imgURL = data['current']['condition']['icon'];

    document.getElementById("img-condition").src = `https:${imgURL}`    
}



SearchButton.addEventListener("click" , CurrentWeatherUpdate);