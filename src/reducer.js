import uuid from 'react-uuid'
import { faTemperatureLow, faSun, faWind, faCloud, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'


const API_WEATHER = '59949a2f1398751dc3d18cd4827da4c9';
function getBackgroundPosition(rise, down, current) {
    let newRise = 0;
    let newDown = 0;
    let dayStart = 0;
    let percent = 0;

    if (current > rise) {

        newRise = rise + 3600 * 24 * 1000; // some little inaccuracy heare. But it doesn't matter
        dayStart = (((newRise - down) / 2) + down) - 3600 * 24 * 1000;
        percent = Math.round((current - dayStart) / (3600 * 24 * 1000) * 100)
        return percent;

    } else if (current < rise) {

        newDown = down - 3600 * 24 * 1000;
        dayStart = rise - ((rise - newDown) / 2);
        percent = Math.round((current - dayStart) / (3600 * 24 * 1000) * 100)
        return percent;

    }

    return percent;

}

function getCloudsInfo(str) {
    let ifRain = /rain/ig;
    let ifSnow = /snow/ig;
    let result = (ifRain.test(str)) ? "goCloud goRain" : (ifSnow.test(str)) ? "goCloud goSnow" : "goCloud";
    return result;
}
function getCloudsCount(num) {
    if (num) {
        let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        let smallCloud = rem * 4;
        let normalCloud = rem * 5;
        let bigCloud = rem * 6;
        let currentWidth = window.innerWidth * (num / 100);
        return {
            small: Math.ceil((currentWidth * 0.5) / smallCloud),
            normal: Math.ceil((currentWidth * 0.3) / normalCloud),
            big: Math.ceil((currentWidth * 0.2) / bigCloud),
        }
    } else {
        return {
            small: 0,
            normal: 0,
            big: 0,
        }
    }
}
function getCloudsSpeed(num) {
    let timeInSec = 480;
    return timeInSec / num;
}

export async function getWeatherData(city) {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_WEATHER}&units=metric`);
    if (data.ok) {
        data = await data.json();

        let sunrise = new Date((data.sys.sunrise + data.timezone + new Date().getTimezoneOffset() * 60) * 1000);
        let sunset = new Date((data.sys.sunset + data.timezone + new Date().getTimezoneOffset() * 60) * 1000);
        let currentTime = new Date((data.dt + data.timezone + new Date().getTimezoneOffset() * 60) * 1000);

        const newState = {
            city: data.name,
            dayPercent: getBackgroundPosition(+sunrise, +sunset, +currentTime),
            visual: {
                clouds: getCloudsInfo(data.weather[0].main),
                cloudsCount: getCloudsCount(data.clouds.all),
                cloudsSpeed: getCloudsSpeed(data.wind.speed),
            },
            weather: {
                temp: {
                    id: uuid(),
                    value: `${Math.round(data.main.temp)} ${String.fromCharCode(8451)}`,
                    icon: faTemperatureLow,
                },
                wind: {
                    id: uuid(),
                    value: `${data.wind.speed} m/s`,
                    icon: faWind,
                },
                sunrise: {
                    id: uuid(),
                    value: `${("0" + new Date(sunrise).getHours().toString()).slice(-2)}:${("0" + new Date(sunrise).getMinutes().toString()).slice(-2)}`,
                    icon: faSortUp,
                    maskIcon: faSun,
                    maskTransform: 'shrink-10 down-1',
                },
                sunset: {
                    id: uuid(),
                    value: `${("0" + new Date(sunset).getHours().toString()).slice(-2)}:${("0" + new Date(sunset).getMinutes().toString()).slice(-2)}`,
                    icon: faSortDown,
                    maskIcon: faSun,
                    maskTransform: 'shrink-10 up-1',
                },
                currentTime: {
                    id: uuid(),
                    value: `${("0" + new Date(currentTime).getHours().toString()).slice(-2)}:${("0" + new Date(currentTime).getMinutes().toString()).slice(-2)}`,
                    icon: faClock,
                },
                clouds: {
                    id: uuid(),
                    value: `${data.clouds.all} %`,
                    icon: faCloud,
                },

            },
            correctCity: true,
        }
        return newState;
    } else {
        return { correctCity: false }
    }
}

export default function (state, action) {
    switch (action.type) {
        case 'setCorrectCity':

            if (state.correctCity !== true) {
                return { ...state, ...action.payload };
            }
            return state;
        case 'setWeatherInfo':

            return { ...state, ...action.payload }

        default:
            return state;
    }
}