import React from "react";
import "../styles/App.css";

function WeatherInfo({ data }) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  const weatherCondition = data.weather[0].main.toLowerCase();

  return (
    <div className={`weather-info ${weatherCondition}`}>
      <h2>{data.name}</h2>
      <img src={iconUrl} alt={data.weather[0].description} />
      <p>Temperature: {data.main.temp}°C</p>
      <p>Weather: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherInfo;
