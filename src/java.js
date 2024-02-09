function displayCityTemp(response) {
	let cityName = document.querySelector("h1");
	cityName.innerHTML = response.data.city;

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

	getForecast(response.data.city);
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

function searchCity(event) {
	event.preventDefault();

	let newCity = document.querySelector("#enter-city-input");
	search(newCity.value);
}

function search(city) {
	let apiKey = "00e9ec4a9o03fe4f37c30a5t73eeb81e";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayCityTemp);
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[date.getDay()];
}

function getForecast(city) {
	let apiKey = "00e9ec4a9o03fe4f37c30a5t73eeb81e";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
	axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
	let forecastHtml = "";

	response.data.daily.forEach(function (day, index) {
		if (index < 5) {
			forecastHtml =
				forecastHtml +
				`<div class="forecast-day">
						<div class="forecast-date">${formatDay(day.time)}</div>
						<div>
						<img src="${day.condition.icon_url}" class="forecast-icon" />
						</div>
						<div class="forecast-temps">
							<div class="forecast-temp">${Math.round(day.temperature.maximum)}º</div>
							/
							<div class="forecast-other-temp">${Math.round(day.temperature.minimum)}º</div>
						</div>
					</div>`;
		}
	});

	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchCity);

let dayTimeElement = document.querySelector("#dayTime");
let currentDayTime = new Date();

dayTimeElement.innerHTML = formatDate(currentDayTime);

search("Paris");
