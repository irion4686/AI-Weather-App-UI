import DailyForecastComponent from '../Components/DailyForecastComponent';
import Stack from 'react-bootstrap/Stack';
const WeeklyForecast = () => {
    return (
        <Stack direction="vertical" gap={2}>
            <DailyForecastComponent/>
            <DailyForecastComponent/>
            <DailyForecastComponent/>
            <DailyForecastComponent/>
            <DailyForecastComponent/>
            <DailyForecastComponent/>
            <DailyForecastComponent/>
        </Stack>
    )
}
export default WeeklyForecast