import React, { useEffect} from 'react'
import Dashboard from './components/Dashboard'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useUserContext } from '@/hooks/Contexts'
import { GameTypes, UserTypes } from '../types/Home'
import { getToken } from '@/utils'

const Home = () => {
  const { push } = useRouter()
  const { setData, kahoots, userInfo} = useUserContext()
  console.log(kahoots)
  useEffect(() => {
    const token = getToken()
    if (!token) {
      push('/login')
    } else {
      if(!userInfo.id){
        (async () => await getUserInfo())()
      }
    }
  }, [userInfo.id])


  const initUserData = (data:UserTypes) => {
    setData({
      userInfo: {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
      },
      kahoots: data.games.map((game:GameTypes)=>{
        return { ...game, coverImage: game.cover_image }
      }),
    })
  }

  const getUserInfo = async () => {
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      })
      initUserData(data)
    } catch (error) {
      console.error(error)
    }
  }
  
  return <Dashboard data={kahoots} title='My Kahoots 🎯' />
}

export default Home
