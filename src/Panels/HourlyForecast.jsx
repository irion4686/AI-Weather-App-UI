import { useEffect } from "react"
import ApiUtils from "../Utils/ApiUtils"

const fetchForecast = async () => {
    let apiUtils = new ApiUtils()
    let forecast = apiUtils.getHourlyForecast('62234')
    console.log(await forecast)
}

const HourlyForecast = () => {
    useEffect(() => {
        fetchForecast()
        
    })

    return (
        <label>Hourly Forecast</label>
    )
}
export default HourlyForecast