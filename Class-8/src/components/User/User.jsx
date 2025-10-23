import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const {userid} = useParams()
  return (
    <div className='flex justify-center items-center text-5xl font-mono font-black text-blue-700 bg-gray-400 h-screen'>User : {userid}</div>
  )
}

export default User