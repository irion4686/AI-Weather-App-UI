import Stack from 'react-bootstrap/Stack';

const DailyForecastComponent = () => {
    return (
        <Stack direction="horizontal" gap={3}>
            <label>Date</label>
            <label>HiLo</label>
            <label>Description</label>
            <label>Precip %</label>
            <label>Wind</label>
        </Stack>
    )
}
export default DailyForecastComponent