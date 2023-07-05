import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloud, faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faSmog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loader from '../Assets/loader.gif'

library.add(faCloud, faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faSmog);

function WeatherSearch() {
  const [search, setSearch] = useState("Kannur");
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");


  useEffect(() => {
    let componentMounted = true;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=23e343b2ea6742cf142bfb32f060c148`
        );
        if (componentMounted && response.status === 200) {
          const weatherData = await response.json();
          setData(weatherData);
        }
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    fetchWeather();

    return () => {
      componentMounted = false;
    };
  }, [search]);

  let emoji = null;
  if (typeof data?.main !== "undefined") {
    if (data?.weather[0].main === "Clouds") {
      emoji = "cloud";
    } else if (data?.weather[0].main === "Thunderstorm") {
      emoji = "bolt";
    } else if (data?.weather[0].main === "Drizzle") {
      emoji = "cloud-rain";
    } else if (data?.weather[0].main === "Rain") {
      emoji = "cloud-showers-heavy";
    } else if (data?.weather[0].main === "Snow") {
      emoji = "snowflake";
    } else {
      emoji = "smog";
    }
  } else {
    return <div className="flex justify-content-center align-items-center">
      <img src={loader} className="flex justify-content-center " alt=""></img>
    </div>;
  }


  let temp = (data?.main?.temp - 273.15)?.toFixed(2);
  let temp_min = (data?.main?.temp_min - 273.15)?.toFixed(2);
  let temp_max = (data?.main?.temp_max - 273.15)?.toFixed(2);

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default",{month:"long"});
  let day = d.toLocaleString("default" , {weekday:"long"});

  let time = d.toLocaleString([],{

    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const HandleSubmit = (e) =>{
    e.preventDefault();
    setSearch(input)

  }

  return (
    <div>
      <div className="container mt-5 mb-2">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                className="h-96"
                src={`https://source.unsplash.com/600x900/?${data?.weather[0].main}`}
                class="card-img"
                alt="weather forcasting......"
              />
              <div className="card-img-overlay">
                <form onSubmit={HandleSubmit}>
                  <div className="input-group mb-4 w-100 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value = {input}
                      onChange={(e)=>setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>

                <div className="bg-dark bg-opacity-50 py-3 rounded">
                  <h2 className="card-title">{data?.name}</h2>
                  {console.log(emoji,":;;;;;;;;;;;;;;;;;;;;;;;;;")}
                  <p className="card-text lead">{day}, {month} {date}, {year}
                  <br/>
                  {time}
                  </p>
                  <hr />
                  <i className={`fas fa-${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">
                    {temp !== undefined ? `${temp} °C` : ""}
                  </h1>
                  <p className="lead fw-bolder mb-0">
                    {data?.weather && data.weather.length > 0
                      ? data.weather[0].main
                      : ""}
                  </p>
                  <p className="lead">
                    {temp_min !== undefined && temp_max !== undefined
                      ? `${temp_min} °C | ${temp_max} °C`
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherSearch;
