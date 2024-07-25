import DailyForecastComponent from '../Components/DailyForecastComponent';
import HourlyForecastComponent from '../Components/HourlyForecastComponent';
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
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [randomKey, setRandomKey] = useState(Math.ceil(Math.random * 10000))

    const apiUtils = new ApiUtils();

    let getForecasts = async (zipcode) => {
        try {
            if (currentWeather || dailyForecast || hourlyForecast || retries === 1) return;
    
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
    
            console.log("Fetching hourly forecast data...");
            const hourlyForecastData = await apiUtils.getHourlyForecast(zipcode);
            console.log("Hourly forecast data received:", hourlyForecastData);
            if (hourlyForecastData) {
                setHourlyForecast(hourlyForecastData);
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

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        const dateObject = new Date(year, month - 1, day);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return dateObject.toLocaleDateString('en-US', options);
    }

    const onChangeActivity = (event) => {
        apiUtils.get24HourRatings(event.target?.value, hourlyForecast).then(res => {
                let updated = [...hourlyForecast]
                for (let i=0; i < updated.length; i++) {
                    updated[i].ratings = res[i];
                    updated[i].activity = event.target.value
                    if (i === 23) {
                        setHourlyForecast([...updated]);
                        setRandomKey(Math.ceil(Math.random * 10000))
                    }
                }
            })
    }


    return (
        <Container style={{ margin: '20px' }}>
            <div className="d-flex justify-content-center">
                <stack>
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
                    { hourlyForecast?.length > 0 && 
                        <Form style={{ padding:'20px 0px 0px 0px'}}  onSubmit={handleSubmit}>
                            <Form.Group>
                                <Stack direction='horizontal' gap={3} >
                                    <Form.Label htmlFor='activity'>Activity:</Form.Label>
                                    <Form.Select required id='activity' onChange={onChangeActivity}>
                                        <option>Choose an activity</option>
                                        <option value='Running'>Running</option>
                                        <option value='Hiking'>Hiking</option>
                                        <option value='Golf'>Golf</option>
                                    </Form.Select>
                                </Stack>
                            </Form.Group>
                        </Form>
                    }
                </stack>
            </div>
    
            <p className="h1 text-center" style={{ padding: '20px 0' }}>Today's Forecast</p>
            {dailyForecast && (
                <div className="text-center mb-4">
                    {/* <i className="wi wi-barometer"></i> */}
                    <p><strong>Date:</strong> {formatDate(dailyForecast.date)}</p>
                </div>
            )}
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
                    <p className="h2 text-center mt-4">Full Day Forecast</p>
                    <Card className="mt-4 p-3" style={{ backgroundColor: '#f8f9fa' }}>
                        <Row className="text-center">
                            <Col className="d-flex flex-column align-items-center">
                                <i className="wi wi-thermometer"></i>
                                <p><strong>{dailyForecast.max_temp + 'ºF'}</strong>/<small>{dailyForecast.min_temp + 'ºF'}</small></p>
                            </Col>
                            <Col className="d-flex flex-column align-items-center">
                                <i className="wi wi-strong-wind"></i>
                                <p className="mb-0"><strong>Wind:</strong> {dailyForecast.max_wind_speed} mph</p>
                            </Col>
                            <Col className="d-flex flex-column align-items-center">
                                <i className="wi wi-raindrop"></i>
                                <p className="mb-0"><strong>Precipitation:</strong> {dailyForecast.precip_prob}%</p>
                            </Col>
                        </Row>
                        <Row className="text-center mt-2">
                            <Col className="d-flex flex-column align-items-center">
                                <i className="wi wi-day-sunny"></i>
                                <p className="mb-0"><strong>UV Index:</strong> {dailyForecast.uv_index}</p>
                            </Col>
                            <Col className="d-flex flex-column align-items-center">
                                <i className="wi wi-sunrise"></i>
                                <p className="mb-0"><strong>Sunrise:</strong> {new Date(dailyForecast.sunrise).toLocaleTimeString()}</p>
                            </Col>
                            <Col className="d-flex flex-column align-items-center">
                                <i className="wi wi-sunset"></i>
                                <p className="mb-0"><strong>Sunset:</strong> {new Date(dailyForecast.sunset).toLocaleTimeString()}</p>
                            </Col>
                        </Row>
                        <Row className="text-center mt-2">
                            <Col className="d-flex flex-column align-items-center">
                                {IconUtils.getWeatherIcon(dailyForecast.weather)}
                                <p className="mb-0"><strong>Weather:</strong> {dailyForecast.weather}</p>
                            </Col>
                        </Row>
                        <Row className="text-center mt-2">
                            <Col className="d-flex flex-column align-items-center">
                                <p className="text-center"><span className="fw-semibold">{'Feels like: '}</span><strong>{dailyForecast.max_apparent_temp + 'ºF'}</strong>/<small>{dailyForecast.min_apparent_temp + 'ºF'}</small></p>
                            </Col>
                        </Row>
                    </Card>
                </div>
            )}
    
            {hourlyForecast && (
                <div className="mt-4">
                    <h2 className="text-center">Hourly Forecast</h2>
                    <HourlyForecastComponent key={randomKey} hourlyForecast={hourlyForecast} />
                </div>
            )}
    
            {!currentWeather && !dailyForecast && <p className="h1 text-center">Enter a zipcode to get the forecast</p>}
        </Container>
    );    
}

export default CurrentWeather;
