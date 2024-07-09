import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import ApiUtils from './Utils/ApiUtils';
function App() {
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
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
