import React, { useEffect, useMemo } from 'react'
import Dashboard from './components/Dashboard'
import { useRouter } from 'next/router'
import axios from 'axios'

const myKahoots = [
  { title: 'Car Logos', image: '/images/car.webp'},
  { title: 'Cool Cars', image: '/images/car.webp'},
]
const Home = () => {
  const {push} = useRouter()
  // const token = null
  
  const getToken = () => {
    return localStorage.getItem('token')
  }
  
  useEffect(()=>{
    const token = getToken()
    if(!token) {
      push('/login')
    }else{
      console.log(token)
    }
  },[])

  const getKahoots = async() => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/games`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
  }

  return (
    <Dashboard data={myKahoots} title='My Kahoots'/>
  )
}

export default Home
