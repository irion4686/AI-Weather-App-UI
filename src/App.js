import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import WeeklyForecast from './Panels/WeeklyForecast';
import HourlyForecast from './Panels/HourlyForecast';
import CurrentWeather from './Panels/CurrentWeather';
import ErrorModal from './Components/ErrorModal';

function App() {
  const [currLocation, setCurrLocation] = useState('current');
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  
  const onNavSelect = (eventKey) => {
    if (currLocation === eventKey) return
    switch (eventKey) {
      case 'current':
        setCurrLocation('current')
        break;
      case 'weekly':
        setCurrLocation('weekly')
        break;
      case 'hourly':
        setCurrLocation('hourly')
        break;
      default:
        setCurrLocation('current')
    }
  }

  const handleError = (error) => {
    setError(error)
    setShowError(true)
  }

  const onCloseError = () => {
    setError(null);
    setShowError(false)
  }
  
  return (
    <div class="bg-dark text-white" >
      <Container  >
        <Navbar sticky='top'  bg='dark-subtle' data-bs-theme="dark" >
          <Container >
            <Nav variant="tabs" defaultActiveKey='current' onSelect={onNavSelect}>
              <Nav.Item>
                <Nav.Link eventKey="current">Today</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="weekly">7 Day</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="hourly">Hourly</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
        <div class="border rounded min-vh-100" >
          {error !== null && <ErrorModal show={showError} onHide={onCloseError} error={error}/>}
          {currLocation === 'current' && <CurrentWeather/>}
          {currLocation === 'weekly' && <Container><WeeklyForecast onError={handleError} /></Container>}
          {currLocation === 'hourly' && <HourlyForecast/>}
        </div>
      </Container>
    </div>
    
  );
}

export default App;
