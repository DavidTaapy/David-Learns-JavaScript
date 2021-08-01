const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2023, 4, 7, 4); // May is 4 due to zero-indexing
let futureDate = new Date(tempYear, tempMonth, tempDay + 10); // Countdown from 10 days after app is started

const year = futureDate.getFullYear();
const day = futureDate.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
const hours = futureDate.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
const minutes = futureDate.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
let weekday = weekdays[futureDate.getDay()];
let month = months[futureDate.getMonth()];

giveaway.textContent = `Giveaway ends on ${weekday}, ${day} ${month} ${year} ${hours}:${minutes} Am`;

// Future Time

const futureTime = futureDate.getTime();

const getRemainingTime = () => {
  const today = new Date().getTime();
  const diff = futureTime - today;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  let days = Math.floor(diff / oneDay);
  let hours = Math.floor((diff % oneDay) / oneHour);
  let minutes = Math.floor((diff % oneHour) / oneMinute);
  let seconds = Math.floor((diff % oneMinute) / 1000);
  const values = [days, hours, minutes, seconds];
  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  })
  if (diff < 0) {
    clearInterval(countdown);
    deadline.innerHTML = '<h4 class="expired">Sorry! This giveaway has expired!</h4>'
  }
}

const format = item => {
  if (item < 10) {
    return item = `0${item}`;
  } else {
    return item;
  }
}

// Counting Down

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();