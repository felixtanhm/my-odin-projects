import weather from "./apiFunctions";
import view from "./domFunctions";

const getWeather = async (initialLoad, input) => {
  let location;
  initialLoad
    ? (location = "singapore")
    : (location = weather.processFormData(input));
  const weatherData = await weather.getForecast(location);
  view.renderData(weatherData);
};

const searchInput = document.getElementById("location-search");
const searchBtn = document.getElementById("location-btn");

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather(false, searchInput);
  }
});
searchBtn.addEventListener("click", (e) => {
  getWeather(false, searchInput);
});

getWeather(true);
