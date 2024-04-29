import React from 'react'

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login/Login'
import { UserProvider } from './UserContext'


const AllRoutes = () => {

  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path='/' element={ <Home  /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </UserProvider>
    </div>
  )
}

export default AllRoutes
