import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import IconUtils from '../Utils/IconUtils';
import ActivityRatingComponent from './ActivityRatingComponent';

const HourlyForecastComponent = ({ hourlyForecast }) => {
    const formatTime = (timeStr) => {
        const date = new Date(timeStr);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    }

    return (
        <div className="hourly-forecast-container" style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
            {hourlyForecast.map((hour, index) => (
                <Card key={index} style={{ display: 'inline-block', width: '150px', margin: '0 5px' }}>
                    <Card.Body>
                    { hour.ratings !== null && hour.activity !== undefined && <p class="fw-bold">{hour.activity}: {hour.ratings}</p>}
                        <Card.Title>{formatTime(hour.time)}</Card.Title>
                        {IconUtils.getWeatherIcon(hour.weather)}
                        <Card.Text>{hour.temp}°F</Card.Text>
                        <Card.Text>{hour.weather}</Card.Text>
                        <Card.Text>Wind: {hour.wind_speed} mph</Card.Text>
                        <Card.Text>Precip: {hour.precip_prob}%</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default HourlyForecastComponent;
