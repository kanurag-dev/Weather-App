const inputSearchText = document.getElementById("city");
const searchButton = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const temp = document.getElementById("temp");
const cityName = document.getElementById("city-name");
const weather = document.getElementById("weather");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");

inputSearchText.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
        searchButton.click()
    }
})

searchButton.addEventListener("click",searchWeather);

async function searchWeather(){
    const city=getCity();
    const [lat,lon ]= await latLon(city); 
    getWeather(lat,lon);
}

async function latLon(city) {
    let resp= await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=76425e6bfb934598122c119a5a8c5f08`)

    let data = await resp.json();
    console.log(data);
    const [lat,lon]=[data[0].lat,data[0].lon];
    console.log("lat  ",lat,"lon ",lon);
    return [lat,lon];
    
}
function getCity(){
    let city=inputSearchText.value;
    cityName.textContent=city;
    return city;

}

async function getWeather(lat,lon) {
    let WeatherResp= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=76425e6bfb934598122c119a5a8c5f08`)
    let weatherData=await WeatherResp.json();
    console.log(weatherData);
}
