import DailyForecastComponent from '../Components/DailyForecastComponent';
import IconUtils from '../Utils/IconUtils';
import ApiUtils from '../Utils/ApiUtils';
import { useState } from 'react';
import { Button, Container, Stack, Card, Row, Col } from 'react-bootstrap';
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
                    <div className="d-flex justify-content-center align-items-center">
                        {IconUtils.getWeatherIcon(currentWeather.weather)}
                        <p style={{ fontSize: '2rem', marginLeft: '10px' }}>{currentWeather.weather}</p>
                    </div>
                    <p style={{ fontSize: '2rem' }}>{currentWeather.temp}°F</p>
                </div>
            )}

            {dailyForecast && (
                <div>
                    <div style={{ padding: '10px 0', borderTop: '1px solid white', width: '100%' }}></div>
                    <p className="h2 text-center mt-4">Today's Forecast</p>
                    <Card className="mt-4 p-3" style={{ backgroundColor: '#f8f9fa' }}>
                        <Row>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-thermometer"></i>
                                <p className="mb-0"><strong>Max Temp:</strong> {dailyForecast.max_temp}°F</p>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-thermometer-exterior"></i>
                                <p className="mb-0"><strong>Min Temp:</strong> {dailyForecast.min_temp}°F</p>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-direction-up"></i>
                                <p className="mb-0"><strong>Max Apparent Temp:</strong> {dailyForecast.max_apparent_temp}°F</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-direction-down"></i>
                                <p className="mb-0"><strong>Min Apparent Temp:</strong> {dailyForecast.min_apparent_temp}°F</p>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-strong-wind"></i>
                                <p className="mb-0"><strong>Max Wind Speed:</strong> {dailyForecast.max_wind_speed} mph</p>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-windy"></i>
                                <p className="mb-0"><strong>Dominant Wind Direction:</strong> {dailyForecast.dominant_wind_direction}°</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-raindrop"></i>
                                <p className="mb-0"><strong>Precipitation Probability:</strong> {dailyForecast.precip_prob}%</p>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-humidity"></i>
                                <p className="mb-0"><strong>UV Index:</strong> {dailyForecast.uv_index}</p>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-sunrise"></i>
                                <p className="mb-0"><strong>Sunrise:</strong> {new Date(dailyForecast.sunrise).toLocaleTimeString()}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-sunset"></i>
                                <p className="mb-0"><strong>Sunset:</strong> {new Date(dailyForecast.sunset).toLocaleTimeString()}</p>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-day-sunny"></i>
                                <p className="mb-0"><strong>Weather:</strong> {dailyForecast.weather}</p>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <i className="wi wi-barometer"></i>
                                <p className="mb-0"><strong>Date:</strong> {dailyForecast.date}</p>
                            </Col>
                        </Row>
                    </Card>
                </div>
            )}

            {!currentWeather && !dailyForecast && <p className="h1 text-center">Enter a zipcode to get the forecast</p>}
        </Container>
    );
}

export default CurrentWeather;
