import { useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Accordion, Container } from 'react-bootstrap';
import PrecipProbComponent from './PrecipProbComponent.jsx';
import WeatherDescriptionComponent from './WeatherDescriptionComponent.jsx';
import WindComponent from './WindComponent.jsx';
import SunriseComponent from './SunriseComponent.jsx';
import SunsetComponent from './SunsetComponent.jsx';
import ActivityRatingComponent from './ActivityRatingComponent.jsx';

const DailyForecastComponent = (props) => {
    const [date, setDate] = useState('')
    const [forecast, setForecast] = useState({})
    
    const getDate = useCallback(() => {
       let date = new Date(props.forecast.date);
       let formattedDate = date.toLocaleString('en-US', {weekday: 'long', day:'numeric'})
       const [day, weekday] = formattedDate.split(' ').map(s => s.trim())
       let abbrDate = weekday.substring(0,3) + ' ' + day
       return abbrDate
    },[props.forecast.date])

    useEffect(() => {
        setForecast(props.forecast)
        setDate(getDate())
        console.log(props.forecast)
    }, [props.forecast, getDate])
    return (
        <div>
            { forecast !== undefined && forecast.ratings !== null && forecast.activity !== undefined && <ActivityRatingComponent activity={forecast.activity} rating={forecast.ratings }/> }
            <Accordion defaultActiveKey="0" style={{height:'100%', width:'100%', padding:'0px 40px 20px 0px'}} class="border border-white p-2 border-opacity-10">
                <Accordion.Item>
                    <Accordion.Header  style={{width:'100%'}} >
                        <Container>
                            <Row>
                                <Col md={1}>
                                {date !== '' && <p  class="text-end fs-5 fw-semibold">{date}</p> }
                                </Col>
                                <Col md={3}>
                                    <p><strong>{forecast.max_temp + 'ºF'}</strong>/<small>{forecast.min_temp + 'ºF'}</small></p>
                                </Col>
                                <Col xl={4}>
                                    <WeatherDescriptionComponent weather={forecast.weather}/>                                
                                </Col>
                                <Col md={1} >
                                    <PrecipProbComponent rain={forecast.rain_sum} snow={forecast.snow_sum} precip_prob={forecast.precip_prob} />                     
                                </Col>  
                                <Col md={1} >
                                    <WindComponent speed={forecast.max_wind_speed} direction={forecast.dominant_wind_direction}/>                  
                                </Col>                       
                            </Row>
                        </Container>
                        
                        
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container >
                            <Row >
                                <Col md={3}>
                                    <p class="text-center"><span class="fw-semibold">{'Feels like: '}</span><strong>{forecast.max_apparent_temp + 'ºF'}</strong>/<small>{forecast.min_apparent_temp + 'ºF'}</small></p>
                                </Col>
                                <Col md={2}>
                                    <p class="text-center"><span class="fw-semibold">{'UV: '}</span>{forecast.uv_index}</p>
                                </Col>
                                <Col md={2}>
                                    <SunriseComponent time={forecast.sunrise} />
                                </Col>
                                <Col md={2}>
                                    <SunsetComponent time={forecast.sunset} />
                                </Col>
                                <Col md={3}>
                                    <p class="text-center"><span class="fw-semibold">{'Precipitation total: '}</span>{(forecast.rain_sum + forecast.snow_sum).toFixed(2) + 'in'} </p>
                                </Col>
                            </Row>
                        </Container>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
        
        
    )
}
export default DailyForecastComponent