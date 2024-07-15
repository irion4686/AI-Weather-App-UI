
import '../../src/Styling/Icons/Styling/weather-icons-wind.min.css'

const WindComponent = (props) => {
    let windClass = 'wi wi-wind towards-' + props.direction + '-deg wi-fw'
    return (
        <div class="d-flex align-items-baseline">
            <i class='wi wi-strong-wind pe-1'></i>
            <p class='pe-1'>{props.speed + 'mph'}</p>
            <i class={windClass}></i>
        </div>
    )
}
export default WindComponent