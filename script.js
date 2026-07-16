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
    try{
        const city=getCity();
        const coord=await latLon(city);
        if(!coord){
            return;
        }
        const weatherData= await getWeather(coord[0],coord[1]);
        console.log(weatherData)
        setWeather(weatherData);
    }
    catch(err){
        console.error(err);
        errorMessage.textContent="Something Went wrong"
    }

}

async function latLon(city) {
    if(city===""){
        errorMessage.textContent="Enter a city";
        return;
    }
    else{
        errorMessage.textContent="";
    }
    let resp= await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=76425e6bfb934598122c119a5a8c5f08`)

    let data = await resp.json();
    if(data.length===0){
        errorMessage.textContent="City not found";
        return;
    }
    else{
        const [lat,lon]=[data[0].lat,data[0].lon];
        return [lat,lon];
    }
    
    
}
function getCity(){
    let city=inputSearchText.value.trim();
    return city;

}

async function getWeather(lat,lon) {
    let WeatherResp= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=76425e6bfb934598122c119a5a8c5f08&units=metric`)
    let weatherData=await WeatherResp.json();
    console.log(weatherData);
    const [weatherCondition,temp,windSpeed,humidity,cityName,icon]=[weatherData.weather[0].main,weatherData.main.temp,weatherData.wind.speed,weatherData.main.humidity,weatherData.name,weatherData.weather[0].icon];
    return [weatherCondition,temp,windSpeed,humidity,cityName,icon];

}
function setWeather(dat) {

    weather.textContent=dat[0];
    humidity.textContent=dat[3];
    windSpeed.textContent=dat[2];
    temp.textContent=dat[1];
    cityName.textContent=dat[4];
    inputSearchText.value="";
    weatherIcon.src=weatherIcon.src = `https://openweathermap.org/img/wn/${dat[5]}@2x.png`;

    
}
