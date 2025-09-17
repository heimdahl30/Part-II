import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [oneCountry, setOneCountry] = useState({});
  const [weather, setWeather] = useState({});

  const api_key = import.meta.env.VITE_API_KEY;

  let duplicatedTheCountry = {};

  const getCountries = async () => {
    const response = await axios.get(
      "https://studies.cs.helsinki.fi/restcountries/api/all"
    );
    return setCountryData(response.data);
  };

  const getSingleCountry = async (name) => {
    const response = await axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
    );
    return setOneCountry(response.data);
  };

  const getWeather = async (city) => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    );
    return setWeather(response.data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (
      Object.values(duplicatedTheCountry).length !== 0 &&
      duplicatedTheCountry.capital
    ) {
      getWeather(duplicatedTheCountry.capital[0]);
    }
  }, [country]);

  console.log(countryData);

  const countryNames = countryData.map((country) => country.name.common);
  console.log(countryNames);

  const filterCountries =
    country !== ""
      ? countryNames.filter((nameItem) =>
          nameItem.toLowerCase().includes(country.toLowerCase())
        )
      : [];

  console.log(filterCountries);

  const Display = ({ country }) => {
    if (Object.values(country).length !== 0) {
      return (
        <>
          <h1>{country.name.common}</h1>
          <div>Capital {country.capital[0]}</div>
          <div>Area {country.area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} />
        </>
      );
    } else {
      return null;
    }
  };

  if (filterCountries.length === 0) {
    return (
      <>
        find countries{" "}
        <input
          type="text"
          value={country}
          name="name"
          onChange={(event) => setCountry(event.target.value)}
        />
      </>
    );
  } else if (filterCountries.length > 10) {
    return (
      <>
        find countries{" "}
        <input
          type="text"
          value={country}
          name="name"
          onChange={(event) => setCountry(event.target.value)}
        />
        <p>Too many matches, specify another filter</p>
      </>
    );
  } else if (filterCountries.length <= 10 && filterCountries.length >= 2) {
    return (
      <>
        find countries{" "}
        <input
          type="text"
          value={country}
          name="name"
          onChange={(event) => setCountry(event.target.value)}
        />
        {filterCountries.map((country) => {
          return (
            <div key={country}>
              {country}{" "}
              <button
                onClick={() => {
                  console.log("clicked", country);
                  getSingleCountry(country);
                  setTimeout(() => {
                    setOneCountry({});
                  }, 5000);
                }}
              >
                show
              </button>
            </div>
          );
        })}
        <Display country={oneCountry} />
      </>
    );
  } else if (filterCountries.length === 1) {
    const theCountry = countryData.find(
      (country) => country.name.common === filterCountries[0]
    );
    console.log(theCountry);

    duplicatedTheCountry = theCountry;

    console.log(duplicatedTheCountry);

    console.log(weather);

    return (
      <>
        find countries{" "}
        <input
          type="text"
          value={country}
          name="name"
          onChange={(event) => setCountry(event.target.value)}
        />
        <h1>{theCountry.name.common}</h1>
        <div>Capital {theCountry.capital[0]}</div>
        <div>Area {theCountry.area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(theCountry.languages).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <img src={theCountry.flags.png} alt={theCountry.name.common} />
        <h2>Weather in {theCountry.capital[0]}</h2>
        <p style={{ marginBottom: "-5px", fontSize: "18px" }}>
          Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius
        </p>
        <img
          src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
          style={{
            height: "130px",
            width: "120px",
            objectFit: "cover",
          }}
        />
        <p style={{ marginTop: "-20px", fontSize: "18px" }}>
          Wind {weather.wind.speed} m/s{" "}
        </p>
      </>
    );
  }
};

export default App;
