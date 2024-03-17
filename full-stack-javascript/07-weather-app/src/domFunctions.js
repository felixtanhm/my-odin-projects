const view = (() => {
  const searchInput = document.getElementById("location-search");
  const locationName = document.getElementById("location");
  const temperature = document.getElementById("temperature");
  const feelsLike = document.getElementById("feels-like");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  function renderData(data) {
    locationName.textContent = data.location.name;
    temperature.textContent = data.current.temp_c + "°C";
    feelsLike.textContent = "Feels Like: " + data.current.feelslike_c + "°C";
    humidity.textContent = "Humidity: " + data.current.humidity + "%";
    wind.textContent = "Wind Speed: " + data.current.wind_kph + "km/h";
    searchInput.value = "";
  }

  return { renderData };
})();

export default view;
