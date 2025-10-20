// --- Weather API ---
async function fetchWeather(city = "Stockholm") {
  try {
    const res = await fetch(`https://wttr.in/${city}?format=3`);
    return await res.text();
  } catch {
    return "⚠️ Weather unavailable";
  }
}

// --- Initialize ---
async function init() {
  const cityInput = document.getElementById("cityInput");
  const weatherText = document.getElementById("weather");
  const getWeatherBtn = document.getElementById("getWeather");

  const defaultCity = cityInput.value.trim() || "Stockholm";
  weatherText.textContent = "📍 " + (await fetchWeather(defaultCity));

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return alert("Please enter a city!");
    weatherText.textContent = "📍 " + (await fetchWeather(city));
  });
}

// Call init when the DOM is ready
document.addEventListener("DOMContentLoaded", init);
