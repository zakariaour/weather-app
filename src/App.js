import React, { useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import "./styles/App.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError(""); 
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found. Please check the spelling.");
        } else if (response.status === 401) {
          throw new Error("Invalid API key.");
        } else if (response.status === 429) {
          throw new Error("API limit reached. Please try again later.");
        }
        throw new Error("Something went wrong. Please try again later.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name (e.g., London, Tokyo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather();
            }
          }}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {weatherData && !isLoading && (
        <>
          <WeatherInfo data={weatherData} />
          <button className="clear" onClick={() => setWeatherData(null)}>
            Clear
          </button>
        </>
      )}
    </div>
  );
}

export default App;
