function searchCity(event) {
	event.preventDefault();

	let newCity = document.querySelector("#enter-city-input");

	let city = document.querySelector("h1");
	city.innerHTML = newCity.value;

	let apiKey = "00e9ec4a9o03fe4f37c30a5t73eeb81e";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity.value}&key=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayCityTemp);
}

function displayCityTemp(response) {
	let cityTempElement = document.querySelector("#current-temp");
	let temperature = Math.round(response.data.temperature.current);
	cityTempElement.innerHTML = temperature;

	let descriptionElement = document.querySelector("#description");
	let description = response.data.condition.description;
	descriptionElement.innerHTML = description;

	let humidityElement = document.querySelector("#humidity");
	let humidity = response.data.temperature.humidity;
	humidityElement.innerHTML = humidity;

	let windElement = document.querySelector("#wind-speed");
	let windSpeed = Math.round(response.data.wind.speed);
	windElement.innerHTML = windSpeed;

	let emojiElement = document.querySelector("#weather-emoji");
	emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji"/>`;
}

function formatDate(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let day = date.getDay();

	if (hours < 10) {
		hours = `0${hours}`;
	}

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let formattedDay = days[day];
	return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchCity);

let dayTimeElement = document.querySelector("#dayTime");
let currentDayTime = new Date();

dayTimeElement.innerHTML = formatDate(currentDayTime);
