import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import ApiUtils from './Utils/ApiUtils';
import WeeklyForecast from './Panels/WeeklyForecast';
import HourlyForecast from './Panels/HourlyForecast';
import CurrentWeather from './Panels/CurrentWeather';
function App() {
  const [currLocation, setCurrLocation] = React.useState('');
  
  const apiUtils = new ApiUtils();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let body = {
          zipcode: "28425"
        }
        const result = await apiUtils.post('/forecast/hourly', body);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      try {
        const result = await apiUtils.get('/forecast/28425');
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  });
  
  const onNavSelect = (eventKey) => {
    switch (eventKey) {
      case 'current':
        setCurrLocation('current')
        break;
      case 'weekly':
        setCurrLocation('weekly')
        break;
      case 'hourly':
        setCurrLocation('hourly')
    }
  }
  
  return (
    <div class=".container-fluid justify-content-center" className='AI Weather App'>
      <Nav variant="tabs" defaultActiveKey="/home" onSelect={onNavSelect}>
        <Nav.Item>
          <Nav.Link eventKey="current">Current</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="weekly">7 Day</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="hourly">Hourly</Nav.Link>
        </Nav.Item>
      </Nav>
      <header className="App-header">
        {currLocation === 'current' && <CurrentWeather/>}
        {currLocation === 'weekly' && <WeeklyForecast/>}
        {currLocation === 'hourly' && <HourlyForecast/>}
      </header>
    </div>
  );
}

export default App;
