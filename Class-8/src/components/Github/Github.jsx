import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const Github = () => {
    const data = useLoaderData()
    // const [data , setData] = useState('')
    // useEffect(() => {
    //     fetch('https://api.github.com/users/muhammad-shayan001')
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data);
    //         setData(data)
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error);
    //     });
    // } , [])
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-4xl '>Github Followers : {data.followers}
    <img src={data.avatar_url} alt="Git Picture" width={300} />
    </div>
  )
}

export default Github

export const githubLoderInfo = async () => {
    const fetchData = await fetch('https://api.github.com/users/muhammad-shayan001')
    return fetchData
}