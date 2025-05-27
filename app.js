document.querySelector('#weatherForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop the form from submitting normally
 
  const userInput = document.querySelector('#cityInput').value;
  getWeather(userInput);
});


async function getWeather(userInput){

  const result = await fetch("https://api.weatherapi.com/v1/current.json?key=801d1476f3c84c9683b30136252505&q=" + userInput);
  const data = await result.json();
  const location =  data.location.name;
  const celsius = data.current.temp_c;
  const fahrenheit = data.current.temp_f;
  const condition = data.current.condition.text;
  const icon = data.current.condition.icon;

  displayWeatherData(location, celsius, fahrenheit, condition,icon);
}

function removePreviousQuery(weatherResult){
    weatherResult.textContent = "";
}


function displayWeatherData(location, celsius, fahrenheit, condition,iconURL){

    const weatherResult = document.querySelector("#weatherResult");
    if(weatherResult.childNodes.length) removePreviousQuery(weatherResult);

    const heading = document.createElement("h2");
    heading.textContent = `Weather in ${location}`;
    weatherResult.appendChild(heading);

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${celsius}°C (${fahrenheit}°F)`;
    weatherResult.appendChild(temperature);

    const conditionText = document.createElement("p");
    conditionText.textContent = `Condition: ${condition}`;
    weatherResult.appendChild(conditionText);

    const icon = document.createElement("img");
    icon.src = iconURL;
    icon.alt = condition;
    weatherResult.appendChild(icon);
}

