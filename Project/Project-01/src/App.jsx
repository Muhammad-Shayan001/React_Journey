import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import { login, logout } from './features/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
const App = () => {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(logout())
    })
    .finally(() => setLoading(false))
  }, [])
 if(loading){
  console.log(loading);
  
  return(
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-spin"></div>
        <div className="absolute inset-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="ml-6">
        <p className="text-white text-xl font-bold animate-pulse">Loading...</p>
        <div className="flex gap-1 mt-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  )
 } else {
  return(
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden'>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header/>
        <main className='flex-grow container mx-auto px-4 py-8 animate-fade-in-up'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  )
 }
}

export default App