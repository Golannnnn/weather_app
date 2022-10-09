import './style.css';
import Clear_icon from './images/clear_icon.png';
import Broken_icon from './images/broken_icon.png';
import Scattered_icon from './images/scattered_icon.png';
import Overcast_icon from './images/overcast_icon.png';
import Rain_icon from './images/rain_icon.png';
import Clear_bg from './images/clear_bg.svg';
import Broken_bg from './images/broken_bg.svg';
import Scattered_bg from './images/scattered_bg.svg';
import Overcast_bg from './images/overcast_bg.svg';
import Mist_bg from './images/mist_bg.svg';
import Fog_bg from './images/fog_bg.svg';
import Rain_bg from './images/rain_bg.svg';
import Light_rain_bg from './images/light_rain_bg.svg';

const body = document.querySelector('body');
const form = document.querySelector('form');
const input = document.querySelector('#input');
const span = document.querySelector('span');
const section = document.querySelector('section');
const p = span.querySelector('p');
const cityEl = document.querySelector('.city-name');
const cloudEl = document.querySelector('.cloud');
const image = document.querySelector('img');
const feelsLikeWrapper = document.querySelector('.feels-like-wrapper');
const feelsLikeTitle = feelsLikeWrapper.firstElementChild;
const humidityWrapper = document.querySelector('.humidity-wrapper');
const humidityTitle = humidityWrapper.firstElementChild;
const tempEl = document.querySelector('.temp');
const tempDegrees = tempEl.nextElementSibling;
const feelsLikeEl = document.querySelector('.feels-like');
const feelsLikeDegrees = feelsLikeEl.nextElementSibling;
const humidityEl = document.querySelector('.humidity');
const humidityDegrees = humidityEl.nextElementSibling;
const celsiusBtn = section.querySelector('.c');
const fahrenheitBtn = section.querySelector('.f');

const fetchCity = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1f50d61745efcac34db5695da7c0205a&units=metric`);
    if (!response.ok) {
      if (response.status === 404) {
        p.style.backgroundColor = 'rgb(255, 0, 0, 0.9)';
        p.textContent = 'City not found.';
        input.focus();
      }
      throw new Error(response.status);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

const displayData = async (city) => {
  try {
    const json = await fetchCity(city);
    const { name } = json;
    const { country } = json.sys;
    const {
      temp,
      feels_like,
      humidity,
    } = json.main;
    const cloud = json.weather[0].description;
    console.log(json.weather[0].description);
    cityEl.textContent = `${name}, ${country}`;

    switch (cloud) {
      case 'clear sky':
        body.style.backgroundImage = `url(${Clear_bg})`;
        image.src = Clear_icon;
        break;
      case 'scattered clouds':
        body.style.backgroundImage = `url(${Scattered_bg})`;
        image.src = Scattered_icon;
        break;
      case 'broken clouds':
        body.style.backgroundImage = `url(${Broken_bg})`;
        image.src = Broken_icon;
        break;
      case 'overcast clouds':
        body.style.backgroundImage = `url(${Overcast_bg})`;
        image.src = Overcast_icon;
        break;
      case 'mist':
        body.style.backgroundImage = `url(${Mist_bg})`;
        image.src = Overcast_icon;
        break;
      case 'fog':
        body.style.backgroundImage = `url(${Fog_bg})`;
        image.src = Overcast_icon;
        break;
      case 'light rain':
        body.style.backgroundImage = `url(${Light_rain_bg})`;
        image.src = Rain_icon;
        break;
      case 'rain':
        body.style.backgroundImage = `url(${Rain_bg})`;
        image.src = Rain_icon;
        break;
      default:
        body.style.backgroundImage = `url(${Scattered_bg})`;
        image.src = Scattered_icon;
    }

    cloudEl.textContent = cloud;
    tempEl.textContent = Math.round(temp);
    tempDegrees.textContent = '°C';
    feelsLikeTitle.textContent = 'Feels like:';
    feelsLikeEl.textContent = Math.round(feels_like);
    feelsLikeDegrees.textContent = '°C';
    humidityTitle.textContent = 'Humidity:';
    humidityEl.textContent = humidity;
    humidityDegrees.textContent = '%';
    section.style.display = 'flex';
    section.style.flexDirection = 'column';
    section.style.alignItems = 'center';
  } catch (err) {
    console.log(err);
  }
};

const validateInput = () => {
  if (input.value.length === 0) {
    p.style.backgroundColor = 'rgb(255, 0, 0, 0.9)';
    p.textContent = 'Input can\'t be empty.';
    input.focus();
  } else {
    const { value } = input;
    displayData(value);
    p.style.backgroundColor = 'unset';
    p.textContent = '';
    input.value = '';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInput();
});

const changeToCelsius = (unit, notation) => {
  const value = Number(unit.textContent);
  const celsius = (value - 32) / 1.800;

  unit.textContent = Math.round(celsius);
  notation.textContent = '°C';
};

const changeToFahrenheit = (unit, notation) => {
  const value = Number(unit.textContent);
  const fahrenheit = value * 1.8000 + 32.00;

  unit.textContent = Math.round(fahrenheit);
  notation.textContent = '°F';
};

celsiusBtn.addEventListener('click', () => {
  if (tempDegrees.textContent === '°F') {
    changeToCelsius(tempEl, tempDegrees);
    changeToCelsius(feelsLikeEl, feelsLikeDegrees);
    celsiusBtn.style.backgroundColor = 'rgb(38, 38, 38)';
    celsiusBtn.style.color = 'white';
    fahrenheitBtn.style.backgroundColor = 'white';
    fahrenheitBtn.style.color = 'rgb(38, 38, 38)';
  }
});

fahrenheitBtn.addEventListener('click', () => {
  if (tempDegrees.textContent === '°C') {
    changeToFahrenheit(tempEl, tempDegrees);
    changeToFahrenheit(feelsLikeEl, feelsLikeDegrees);
    fahrenheitBtn.style.backgroundColor = 'rgb(38, 38, 38)';
    fahrenheitBtn.style.color = 'white';
    celsiusBtn.style.backgroundColor = 'white';
    celsiusBtn.style.color = 'rgb(38, 38, 38)';
  }
});
