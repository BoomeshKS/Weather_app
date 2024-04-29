
// import './App.css';
// // import React, { useState } from 'react'
// import axios from 'axios'
// import Login from './Login/Login'
// import { Link } from 'react-router-dom';

// function App() {
//   const [data, setData] = useState({})
//   const [location, setLocation] = useState('')
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

//   const searchLocation = (event) => {
//     if (event.key === 'Enter') {
//       axios.get(url).then((response) => {
//         setData(response.data)
//         console.log(response.data)
//       })
//       setLocation('')
//     }
//   }




//   return (



//     <div className='Home-app'>
//       <div className='Home-title'>
//         <h1>Weather Monitoring Application</h1>
//       </div>
//       <div className='button-1'>
//         <button type='button' >Login</button>
//         <span><a href='/Ask'>About</a></span>
//       </div>

//       <div className="search">
//         <input
//           value={location}
//           onChange={event => setLocation(event.target.value)}
//           onKeyPress={searchLocation}
//           placeholder='Enter Location'
//           type="text" id='one' />
//       </div>
//       <div className="container">
//         <div className="top">
//           <div className="location">
//             <p>{data.name}</p>
//           </div>
//           <div className="temp">
//             {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
//           </div>
//           <div className="description">
//             {data.weather ? <p>{data.weather[0].main}</p> : null}
//           </div>
//         </div>

//         {data.name !== undefined &&
//           <div className="bottom">
//             <div className="feels">
//               {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
//               <p>Feels Like</p>
//             </div>
//             <div className="humidity">
//               {data.main ? <p className='bold' style={{color: 'black'}}>{data.main.humidity}%</p> : null}
//               <p style={{color: 'black'}}>Humidity</p>
              
//             </div>
//             <div className="wind">
//               {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
//               <p>Wind Speed</p>
//             </div>
//           </div>
//         }

        



//       </div>




//     </div>
//   );
// }

// export default App;


import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import AllRoutes from './AllRoutes'

const App = () => {
  return (
    <div>
      <Router>
        <AllRoutes />
      </Router>
    </div>
  )
}

export default App
