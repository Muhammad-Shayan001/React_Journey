import { Functions } from 'appwrite'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected  ({children , authentication= true})  {
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // Easy
        // if(authStatus === true){
        //     navigate('/login')
        // } else if (authStatus === false) {
        //     navigate('/')
        // }
        // hard 
        if(authentication && authStatus !== authentication){
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')

        }
        setTimeout(() => setLoader(false), 0)

    } , [authStatus , navigate , authentication])

    function loading () {

        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-600 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-indigo-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <span className="ml-4 text-indigo-700 font-semibold text-lg">Loading...</span>
            </div>
        )
    }

  return loader ? loading() : <>{children}</>
}
