import DailyForecastComponent from '../Components/DailyForecastComponent';
import ApiUtils from '../Utils/ApiUtils';
import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const WeeklyForecast = (props) => {
    const [zipcode, setZipcode] = useState('');
    const [forecast, setForecast] = useState([]);
    const [retries, setRetries] = useState(0)
    const [isValid, setIsValid] = useState(true)

    const apiUtils = new ApiUtils();
    let getForecast = async (newZipcode) => {
        try {
            if (zipcode === newZipcode && (forecast.length > 0 || retries === 1)) return
            setForecast(await apiUtils.getWeeklyForecast(newZipcode))
            setZipcode(newZipcode)
            
        } catch (error) {
            props.onError(error)
            setTimeout(() => {setRetries(retries + 1)}, 5000)
            //setSubmitted(false)
        }   
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const regex = /^\d{5}$/;
        if (regex.test(event.target[0].value)) {
            setIsValid(true)
            getForecast(event.target[0].value)
            
        } else {
            setIsValid(false)
        }   
    }

    const onChangeActivity = (event) => {
        setForecast([...apiUtils.getRatings(event.target?.value, forecast)])
    }
   
    return (
        <Container style={{ margin:'20px'}}>
            <div class="d-flex justify-content-center" >
                <stack>
                    <Form  onSubmit={handleSubmit}>
                        <Form.Group>
                            <Stack direction='horizontal' gap={3} >
                                <Form.Label htmlFor='zipcode'>Zipcode:</Form.Label>
                                <Stack>
                                    <Form.Control required id='zipcode' placeholder='Enter zipcode' isInvalid={!isValid}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid zip.
                                    </Form.Control.Feedback>
                                </Stack>
                                <Button size='sm' variant='light' type='submit'>Get Forecast</Button>
                            </Stack>
                        </Form.Group>
                    </Form>
                    <Form  onSubmit={handleSubmit}>
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
                </stack>

            </div>
            
            <p class="h1 text-center" style={{ padding: '20px 0'}}>7-Day Forecast</p>
            <div style={{ padding: '10px 0', borderTop: '1px solid white', width: '100%' }}></div>
            {forecast?.length > 0 && forecast.map(day => <div ><DailyForecastComponent key={Math.ceil(Math.random * 10000)} activity={forecast?.activity} forecast={day} rating={forecast?.ratings} /></div>)}
            {forecast.length === 0 && <p class="h1 text-center">Enter a zipcode to get the forecast</p>}
        </Container>
    )
}
export default WeeklyForecast