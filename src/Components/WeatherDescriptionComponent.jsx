import IconUtils from '../Utils/IconUtils'
import '../../src/Styling/Icons/Styling/weather-icons.min.css'

const WeatherDescriptionComponent = (props) => {
    return (
        <div class="d-flex align-items-baseline"  >
            {IconUtils.getWeatherIcon(props.weather)}
            <p class='ps-2' >{props.weather}</p>
        </div>
    )
}
export default WeatherDescriptionComponent