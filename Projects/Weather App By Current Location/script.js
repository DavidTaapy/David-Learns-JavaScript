window.addEventListener('load', () => {             // Run after loading
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let sunriseText = document.querySelector('.sunrise-time');
    let sunsetText = document.querySelector('.sunset-time');
    let locationTimezone = document.querySelector('.location-timezone');
    let theIcon = document.querySelector('.icon');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');
    let actualDegree = document.querySelector('.degree-section h2'); 

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api_key = "4f66fa1fb35fd89b674111c95ad76706";
            const excludes = "minutely,hourly,daily,alerts";
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${excludes}&appid=${api_key}&units=imperial`;
        
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const weatherDesc = data.current.weather[0];
                const { temp, feels_like, sunrise, sunset } = data.current;
                const icon = weatherDesc.icon;
                // Set DOM Elements from the API
                temperatureDescription.textContent = CapitalizeFirstLetter(weatherDesc.description);
                temperatureDegree.textContent = temp;
                locationTimezone.textContent = data.timezone;
                // Setting sunrise & sunset
                sunriseText.textContent = UnixUTCToTime(sunrise);
                sunsetText.textContent = UnixUTCToTime(sunset);
                // Setting weather icon
                setIcons(icon, theIcon);
                // Changing between degrees & farenheit
                let celsius = Math.floor((temp - 32) * (5 / 9));
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        actualDegree.textContent = celsius;
                    } else {
                        temperatureSpan.textContent = "F";
                        actualDegree.textContent = temp;
                    }
                })
            });
        });
    }

    function setIcons(icon, theIcon) {
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        theIcon.src = iconUrl;
    }
});

function CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function UnixUTCToTime(unixTime) {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}