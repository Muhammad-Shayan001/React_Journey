import React, { useContext } from 'react'
import UserContextProvider from './context/UserContextProvider'
import UserContext from './context/UserContext'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'

const App = () => {
  
  
  return (
    <UserContextProvider>
     <h1>Hello Welcome to Our Website</h1>
    <Login />
    <Profile />

   </UserContextProvider>
  )
}

export default App