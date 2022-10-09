import './style.css';

const fetchCity = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1f50d61745efcac34db5695da7c0205a&units=metric`);
    if (!response.ok) {
      if (response.status === 404) {
        alert('City not found.');
      }
      throw new Error(response.status);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};
