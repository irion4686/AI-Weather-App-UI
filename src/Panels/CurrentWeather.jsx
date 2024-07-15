import DailyForecastComponent from '../Components/DailyForecastComponent';
import ApiUtils from '../Utils/ApiUtils';
import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const CurrentWeather = (props) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [retries, setRetries] = useState(0);
    const [isValid, setIsValid] = useState(true);
    const [zipcode, setZipcode] = useState('');

    const apiUtils = new ApiUtils();

    let getForecasts = async (zipcode) => {
        try {
            if (currentWeather || dailyForecast || retries === 1) return;

            console.log("Fetching current weather data...");
            const currentWeatherData = await apiUtils.getCurrentWeather(zipcode);
            console.log("Current weather data received:", currentWeatherData);
            if (currentWeatherData) {
                setCurrentWeather(currentWeatherData);
            }

            console.log("Fetching daily forecast data...");
            const dailyForecastData = await apiUtils.getDailyForecast(zipcode);
            console.log("Daily forecast data received:", dailyForecastData);
            if (dailyForecastData) {
                setDailyForecast(dailyForecastData);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            props.onError(error);
            setTimeout(() => { setRetries(retries + 1) }, 5000);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const regex = /^\d{5}$/;
        if (regex.test(event.target[0].value)) {
            setIsValid(true);
            setZipcode(event.target[0].value);
            getForecasts(event.target[0].value);
        } else {
            setIsValid(false);
        }
    }

    return (
        <Container style={{ margin: '20px' }}>
            <div className="d-flex justify-content-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Stack direction='horizontal' gap={3}>
                            <Form.Label htmlFor='zipcode'>Zipcode:</Form.Label>
                            <Stack>
                                <Form.Control required id='zipcode' placeholder='Enter zipcode' isInvalid={!isValid} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid zip.
                                </Form.Control.Feedback>
                            </Stack>
                            <Button size='sm' variant='light' type='submit'>Get Forecast</Button>
                        </Stack>
                    </Form.Group>
                </Form>
            </div>

            <p className="h1 text-center" style={{ padding: '20px 0' }}>Today's Forecast</p>
            <div style={{ padding: '10px 0', borderTop: '1px solid white', width: '100%' }}></div>

            {currentWeather && (
                <div className="text-center mt-4">
                    <h2>Current Weather</h2>
                    <p style={{ fontSize: '2rem' }}>{currentWeather.weather}</p>
                    <p style={{ fontSize: '2rem' }}>{currentWeather.temp}°F</p>
                </div>
            )}

            {dailyForecast && (
                <div className="mt-5">
                    <DailyForecastComponent forecast={dailyForecast} />
                </div>
            )}

            {!currentWeather && !dailyForecast && <p className="h1 text-center">Enter a zipcode to get the forecast</p>}
        </Container>
    );
}

export default CurrentWeather;
