const apiKey = "2eb6bc17ab8c43a18f592345242212";
const apiUrl = "http://api.weatherapi.com/v1/current.json";

document.getElementById("getWeather").addEventListener("click", async () => {
  const region = document.getElementById("region").value;
  const weatherResult = document.getElementById("weatherResult");

  if (!region) {
    weatherResult.innerHTML = "<p>Please enter a region.</p>";
    return;
  }

  weatherResult.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${region}`);
    if (!response.ok) throw new Error("Failed to fetch weather data.");

    const data = await response.json();
    const { location, current } = data;

    weatherResult.innerHTML = `
                    <h2>Weather in ${location.name}, ${location.region}</h2>
                    <p><strong>Temperature:</strong> ${current.temp_c}&#8451; (${current.temp_f}&#8457;)</p>
                    <p><strong>Condition:</strong> ${current.condition.text}</p>
                    <img src="${current.condition.icon}" alt="Weather Icon">
                    <p><strong>Wind:</strong> ${current.wind_kph} kph</p>
                    <p><strong>Humidity:</strong> ${current.humidity}%</p>
                `;
  } catch (error) {
    weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
