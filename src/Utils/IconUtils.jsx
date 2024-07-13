
class IconUtils {
    static getWeatherIcon = (weather) => {
        let icon = ''
        switch (weather) {
            case 'Clear sky':
            case 'Mainly Clear':
                icon = 'wi wi-day-sunny'
                break;
            case 'Partly cloudy':
                icon = 'wi wi-day-cloudy'
                break;
            case 'Overcast':
                icon = 'wi wi-cloudy'
                break;
            case 'Fog':
            case 'Depositing rime fog':
                icon = 'wi wi-day-fog'
                break;
            case 'Light drizzle':
            case 'Moderate drizzle':
            case 'Dense drizzle':
                icon = 'wi wi-day-sprinkle'
                break;
            case 'Slight rain':
            case 'Moderate rain':
            case 'Heavy rain':
                icon = 'wi wi-day-rain'
                break;
            case 'Light freezing rain':
            case 'Heavy freezing rain':
                icon = 'wi wi-day-sleet'
                break;
            case 'Slight snow fall':
            case 'Moderate snow fall':
            case 'Heavy snow fall':
            case 'Snow grains':
            case 'Slight snow showers':
            case 'Heavy snow showers':
                icon = 'wi wi-day-snow'
                break;
            case 'Slight rain showers':
            case 'Moderate rain showers':
                icon = 'wi wi-day-showers'
                break;
            case 'Violent rain showers':
                icon = 'wi wi-day-storm-showers'
                break;
            case 'Thunderstorm':
                icon = 'wi wi-day-thunderstorm'
                break;
            case 'Thunderstorm with slight hail':
            case 'Thunderstorm with heavy hail':
                icon = 'wi wi-day-sleet-storm'
                break;
            default:
                icon =''
        }
        return (<i class ={icon} />)
    }   
}

export default IconUtils