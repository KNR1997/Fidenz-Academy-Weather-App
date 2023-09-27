import React, { useEffect, useState } from "react";
import cities from "../../assests/cities.json";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [jsonData, setJsonData] = useState([]);
  const [cityName, setCityName] = useState();
  const [city, setCity] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    setJsonData(cities.List);
  }, []);

  useEffect(() => {
    checkValidCity(cityName);
  }, [cityName]);

  const handleSearch = async () => {
    if (checkValidCity(cityName)) {
      console.log(city);
      fetchData();
    } else {
      console.log("not a valid city");
      notify();
    }
  };

  const notify = () => {
    toast.error("Invalid City Name", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const checkValidCity = (cityName) => {
    let result = false;
    jsonData.forEach((object) => {
      if (object.CityName.toLowerCase() === cityName.toLowerCase()) {
        setCity(object);
        result = true;
      }
    });
    return result;
  };

  const fetchData = async () => {
    const apiKey = "cd2009142a894276f5cde9b9ef653137";
    const apiUrl = "http://api.openweathermap.org/data/2.5/group";
    try {
      const response = await fetch(
        `${apiUrl}?id=${city.CityCode}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setResponse(jsonData.list[0]);
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("cityName", cityName);
  console.log("city", city);

  return (
    <div id="home">
      <div className="home container">
        <div className="title">
          <h2>Weather App</h2>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Enter a city"
            onChange={(e) => setCityName(e.target.value)}
          ></input>
          <button onClick={handleSearch}>Search</button>
          <div>
            <ToastContainer />
          </div>
        </div>
        {response && (
          <div className="city">
            <div className="top">
              <div className="city-name">{response.name}</div>
              <div className="top-divide">
                <div className="divide-left">
                  {response.weather[0].description}
                </div>
                <div className="divide-right">
                  <h3 className="temparatue">{response.main.temp}</h3>
                  <h4 className="sm">Temp Min: {response.main.temp_min}</h4>
                  <h4 className="sm">Temp Max: {response.main.temp_max}</h4>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div>
                <h4 className="sm">Pressure: {response.main.pressure}</h4>
                <h4 className="sm">Humidity: {response.main.humidity}</h4>
                <h4 className="sm">
                  Visibility: {response.visibility / 1000}km
                </h4>
              </div>
              <div>
                {response.wind.speed}m/s {response.wind.deg} Degree
              </div>
              <div>
                <h4 className="sm">Sunrise: {}</h4>
                <h4 className="sm">Sunset: {}</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
