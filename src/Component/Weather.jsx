import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import clear_weather from '/clear.png';
import cloudy_weather from '/cloudy.png';
import drizzle_weather from '/drizzle.png';
import humidity_weather from '/humidity.png';
import snow_weather from '/snow.png';
import windy_weather from '/windy.png';

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temp: '',
    location: '',
    icon: ''
  });

  const allIcons = {
    "01d": clear_weather,
    "01n": clear_weather,
    "02d": cloudy_weather,
    "02n": cloudy_weather,
    "03d": cloudy_weather,
    "03n": cloudy_weather,
    "04d": drizzle_weather,
    "04n": drizzle_weather,
    "09d": drizzle_weather,
    "09n": drizzle_weather,
    "10d": drizzle_weather,
    "10n": drizzle_weather,
    "13d": snow_weather,
    "13n": snow_weather
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_weather;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref = {inputRef} type="text" placeholder='Search' />
        <img className='search_logo' src='/54481.png' alt='Search icon' onClick = {() => search(inputRef.current.value)} />
      </div>
      <img className='weather-icon' src={weatherData.icon} alt='Weather icon' />
      <p className='temp'>{weatherData.temp}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather_data'>
        <div className='col1'>
          <img src={humidity_weather} alt='Humidity icon' />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col2'>
          <img src={windy_weather} alt='Wind icon' />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
