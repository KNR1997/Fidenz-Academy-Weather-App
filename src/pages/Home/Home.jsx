import React, { useEffect, useState } from "react";
import cities from "../../assests/cities.json";
import "./home.css";

function Home() {
  const [jsonData, setJsonData] = useState([]);
  const [cityName, setCityName] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setJsonData(cities.List);
  }, []);

  const handleSearch = () => {
    if (checkValidCity(cityName)) {
      console.log(city);
      fetchData();
    } else {
      console.log("not a valid city");
    }
  };

  const checkValidCity = (city) => {
    let result = false;
    jsonData.forEach((object) => {
      if (object.CityName.toLowerCase() === city.toLowerCase()) {
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
      console.log(jsonData);

    } catch (err) {
      console.log(err);
    }
  };

  console.log(jsonData);

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
        </div>
      </div>
    </div>
  );
}

export default Home;
