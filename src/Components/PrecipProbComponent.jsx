import '../../src/Styling/Icons/Styling/weather-icons.min.css'

const PrecipProbComponent = (props) => {
    let rainDominant = props.rain >= props.snow
    return (
        <div class="d-flex align-items-baseline">
            {rainDominant && <i class='wi wi-raindrop pe-1'></i>}
            {!rainDominant && <i class='wi wi-snowflake-cold pe-1'></i>}
            <p>{props.precip_prob + '%'}</p>
        </div>
    )
}
export default PrecipProbComponent