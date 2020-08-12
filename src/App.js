import React, { useState } from "react";

import { fetchWeather } from "./api/fetchWeather";
import './App.css'

const App = () => {
    // useState is a Hook that lets you add React state to function components
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if (e.key === "Enter") {
            const data = await fetchWeather(query)

            // set the weather object on state
            setWeather(data);
            // reset the input value, after search action
            setQuery('');
        }
    }

    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            {/*js ternary operation, if true div is rendered*/}
            {weather.main && (
                // display weather infos
                <div className="city">
                    <h2 className="city-name">
                    <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} className="city-icon"/>
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;