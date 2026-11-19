const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('.search-btn');
const climateConditon = document.querySelector('.climate-condition');
const climateInfo = document.querySelector('.climate-info');
const cityName = document.querySelector('.city-name');
const cityDetails = document.querySelector('.city-details');
const degreeCount = document.querySelector('.degree');
const subDegree = document.querySelector('.sub-deg');
const maxDegree = document.querySelector('.max-degree');
const minDegree = document.querySelector('.min-degree');
const humidityLevel = document.querySelector('.humidity-level');
const windSpeed = document.querySelector('.windspeed-level');
const pressureLevel = document.querySelector('.pressure-level');
const visibilityLevel = document.querySelector('.visibility-level');
const errorMsg = document.querySelector('.error');
const apiKey = "39cdbdf47bc1f13aa1dc69cdb6cbd446";


async function getWeather(){
    const location = inputBox.value.trim();
    if(location === '') {
        console.log('Enter location');
        return;
    }
    
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        const fetchUrl = await fetch(url);
        const data = await fetchUrl.json();

        if(!fetchUrl.ok){
            throw new Error("city not found");
        }
        errorMsg.classList.add('d-none');
        cityName.innerText = data.name;
        cityDetails.innerText= data.sys.country;
        climateConditon.innerText = data.weather[0].main;
        climateInfo.innerText = data.weather[0].description;
        degreeCount.innerText = Math.round(data.main.temp)+'°';
        subDegree.innerText = Math.round(data.main.feels_like)+'°';
        maxDegree.innerText = Math.round(data.main.temp_max)+'°';
        minDegree.innerText = Math.round(data.main.temp_min)+'°';
        humidityLevel.innerText = data.main.humidity + '%';
        windSpeed.innerText = data.wind.speed + ' km/hr'
        pressureLevel.innerText = data.main.pressure + ' hPa';
        visibilityLevel.innerText = (data.visibility/1000) + 'km/hr';

        inputBox.value = '';
    }
    catch(err){
        errorMsg.classList.remove('d-none');

    }
}

searchBtn.addEventListener('click',getWeather);
inputBox.addEventListener('keydown',(e)=>{
    if(e.key === "Enter"){
        getWeather();
    }
});
