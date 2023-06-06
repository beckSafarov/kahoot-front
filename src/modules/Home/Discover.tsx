import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import axios from 'axios'
import { getToken } from '@/utils'
// import { GameTypes } from '@/types/Home'
const allKahoots = [
  {id:1, title: 'Car Logos', image: '/images/car.webp', author: 'Begzod Safarov', coverImage: '', },
  {id: 2, title: 'Cool Cars', image: '/images/car.webp', author: 'John Doe', coverImage: '' },
]

// type KahootType

const Discover = () => {
  // const [allKahoots, setAllKahoots] = useState<any>(null)
  
  useEffect(()=>{
    getAllKahoots()
  }, [])

  const getAllKahoots = async() => {
    try{
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/games/`, {
        headers: {
          'Authorization':`Bearer ${getToken()}`
        }
      })
      // setAllKahoots(data.map((game:GameTypes)=>({
      //   ...game, id: 10
      // })))
    }catch(error){
      console.error(error)
    }
  }

  return (
    <Dashboard title='Discover Kahoots' data={allKahoots}/>
  )
}

export default Discover