// ButtonComponent.js
// import React from 'react';
import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Login from './Login/Login'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UserContext from './UserContext';
import { useContext } from 'react';
import icon from './Assests/Icon-1.jpeg'


function Home() {

  const  {loginUsername}  = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);




  useEffect(() => {
    if(loginUsername){
      setIsLoggedIn(true)
    }
  })


  const handleLogout = () => {
    setIsLoggedIn(false);
  };



  const handleLogin = () => {

    navigate('/login');


  }



    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');

    
  
    const searchLocation = () => {
      
      if (user === 1) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
        axios.get(url).then((response) => {
          setData(response.data);
          setTemperature(response.data.main.temp.toFixed());
          setHumidity(response.data.main.humidity);
          console.log(loginUsername)
          console.log(location+ "Hii")
          console.log("Temperature value:", response.data.main.temp.toFixed());
          console.log(response.data)
          sendWeatherDataToBackend(response.data.main.temp.toFixed(), response.data.main.humidity, location, loginUsername);
        })
        setLocation('')
      }
    }
    const user = 1;
    const navigate = useNavigate();
    

    const sendWeatherDataToBackend = async (temperatureToSend, humidityToSend, locationToSend) => {
      try {
        console.log("Location:", locationToSend)
        console.log('Temperature to send:', temperatureToSend);

        const response = await axios.post('http://localhost:5000/api/weather', 
        {
          location: locationToSend,
          temperature: temperatureToSend,
          humidity: humidityToSend,
          loginUsername: loginUsername,
        });
        console.log('Weather data sent to backend:', response.data);
      } catch (error) {
        console.error('Error sending weather data to backend:', error);
      }

    };

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/weather', {
        })
          .then(response => {
            if(response && response.data){
              const sortedData = response.data.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
              });
              setWeatherData(sortedData);
            }
          })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, []);

    const handleDelete = (location) => {
        axios.delete(`http://localhost:5000/api/weather/delete/${location}`)
            .then(response => {
                console.log(response.data);
                setWeatherData(prevData => prevData.filter(item => item.Location !== location));
            })
            .catch(error => {
                console.error('Error deleting weather data:', error);
            });
    };

    const RefreshPage = () => {
      window.location.reload();
    };







  
  
  
  
    return (
  
  
  
      <div className='Home-app'>
        <div className='Home-title'>
          <h1>Weather Monitoring Application</h1>
        </div>
        {isLoggedIn ? (
          <h2>Welcome, {loginUsername}</h2>
        ) : (
          <div className='button-1'>
            <p>For order to see the weather in your location please to continue by clicking login button</p>
            <button to='/login' onClick={handleLogin}>Login</button>
          </div>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout}>Logout</button>
        )}
        


        <div className="weather">
          <h2>Weather</h2>
          <p>The weather, with its ever-changing moods, paints the canvas of our days with a myriad of hues. From the gentle caress of a warm breeze on a summer afternoon to the dramatic symphony of thunderstorms echoing through the night, weather shapes our experiences in profound ways. It dictates our attire, influences our plans, and even stirs the depths of our emotions. In its unpredictability lies both excitement and apprehension, for each day holds the promise of a new meteorological adventure.
           The weather, in its vast and infinite variability, serves as a reminder of nature's power and beauty, weaving a tapestry of wonder that envelops us all.Weather refers to the condition of the atmosphere at a particular time and place. It's influenced by various factors like temperature, humidity, precipitation (rain, snow, etc.), wind speed and direction, and cloud cover. These elements combine to create the conditions we experience daily, from scorching sunshine to pouring rain. Weather can change rapidly over short periods, like sudden downpours during a sunny day.  Meteorologists study weather patterns to predict future conditions, helping us plan our days and prepare for potential hazards</p>
        </div>
  
        <div className="search">
          <h2>Enter the location here</h2>
          <input
            value={location}
            onChange={event => setLocation(event.target.value) }
            // onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" id='one' />
            <button onClick={searchLocation}>Search</button>
        </div>
        <div className="container">
          <h1>Location : </h1>
          <div className="location">
            <h1>{data.name}</h1>
          </div>
          <div className="top">
            <div className="temp">
              {temperature ? <h2>{temperature}°F</h2> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
  
          {data.name !== undefined &&
            <div className="bottom">
              <div className="humidity">
                {data.main ? <h2 className='bold' style={{color: 'black'}}>{data.main.humidity}%</h2> : null}
                <p style={{color: 'black'}}>Humidity</p>
                
              </div>
              <div className="wind">
                {data.wind ? <h2 className='bold'>{data.wind.speed.toFixed()} MPH</h2> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
          
  
  
  
        </div>

        <div className="return-data">
          <div className="reload">
            <h1>Weather Data</h1>
            <button onClick={RefreshPage}>History</button>
          </div>
          <ul>
            {weatherData.map((data, index) => (
              <li key={index}>
                <p>Location: {data.Location}</p>
                <p>Temperature: {data.Temperature}°F</p>
                <p>Humidity: {data.Humidity}%</p>
                <button onClick={() => handleDelete(data.Location)} className='history-button'>Delete</button>
              </li>
            ))}
          </ul>
        </div>


        <div className="weather">
          <h2>Uses</h2>
          <p>A weather app serves as a versatile tool with multiple uses catering to various needs. Its primary function lies in providing users with up-to-date information on current weather conditions, offering insights into temperature, humidity levels, wind speeds, and precipitation. This feature allows individuals to make informed decisions about their day-to-day activities, whether it's planning a leisurely outing or scheduling important events. Additionally, travelers find weather apps indispensable for pre-trip planning, enabling them to pack appropriate clothing and anticipate weather-related challenges at their destinations. Moreover, the app's ability to deliver alerts and warnings for severe weather phenomena such as storms, hurricanes, or extreme temperatures plays a crucial role in ensuring public safety. Beyond personal use, weather apps find practical applications in industries like agriculture and construction, where professionals rely on accurate forecasts to optimize operations, mitigate risks, and safeguard assets. In essence, the versatility and accessibility of weather apps make them invaluable tools for individuals, businesses, and communities alike, facilitating better decision-making and enhancing overall safety and efficiency in various endeavors.</p>
        </div>

        <footer className='footer'>
          <h5>&copy; Weather App 2024</h5>
        </footer>
  
  
      </div>
    );


}
export default Home;
