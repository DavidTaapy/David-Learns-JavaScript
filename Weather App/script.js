window.addEventListener('load', () => {             // Run after loading
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    // let temperatureFeeling = document.querySelector('.temperature-feels-like');
    let locationTimezone = document.querySelector('.location-timezone');
    let theIcon = document.querySelector('.icon');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');
    let actualDegree = document.querySelector('.degree-section h2'); 

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api_key = "a5925db312ab6acff5a70d18e3897f59";
            const excludes = "minutely,hourly,daily,alerts";
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${excludes}&appid=${api_key}&units=imperial`;
        
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const weatherDesc = data.current.weather[0];
                const { temp, feels_like } = data.current;
                const icon = weatherDesc.icon;
                // Set DOM Elements from the API
                temperatureDescription.textContent = CapitalizeFirstLetter(weatherDesc.description);
                temperatureDegree.textContent = temp;
                // temperatureFeeling.textContent = feels_like;
                locationTimezone.textContent = data.timezone;
                // Setting weather icon
                setIcons(icon, theIcon);
                // Changing between degrees & farenheit
                // Formula for celsius
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