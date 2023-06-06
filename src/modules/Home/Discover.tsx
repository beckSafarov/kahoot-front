import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import axios from 'axios'
import { getToken } from '@/utils'
import { KahootTypes } from '../types/Home'

const Discover = () => {
  const [allKahoots, setAllKahoots] = useState<[KahootTypes] | []>([])
  
  useEffect(() => {
    if (allKahoots.length < 1) getAllKahoots()
  }, [allKahoots.length])

  const getAllKahoots = async() => {
    try{
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/games/`, {
        headers: {
          'Authorization':`Bearer ${getToken()}`
        }
      })
      setAllKahoots(
        data
          .filter((game: KahootTypes) => game.cover_image.match(/http/i))
          .map((game: KahootTypes) => ({
            ...game,
            coverImage: game.cover_image,
          }))
      )
    }catch(error){
      console.error(error)
    }
  }

  return (
    <Dashboard title='Discover Kahoots' data={allKahoots}/>
  )
}

export default Discover