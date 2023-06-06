import { Box, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getToken } from '@/utils'

type GameTypes = {
  id?: number, 
  generatedCode: number, 
  totalGamers: number
}

const saveGameToLC = ({ id, generatedCode, totalGamers }: GameTypes) => {
  localStorage.setItem('id', JSON.stringify(id))
  localStorage.setItem('generatedCode', JSON.stringify(generatedCode))
  localStorage.setItem('totalGamers', JSON.stringify(totalGamers))
}

const getExistingGame = (): GameTypes | undefined => {
  if (!localStorage.getItem('id')) return
  return {
    id: Number(localStorage.getItem('id')),
    generatedCode: Number(localStorage.getItem('generatedCode')),
    totalGamers: Number(localStorage.getItem('totalGamers')),
  }
}

const Play = () => {
  const router = useRouter()
  const id = router.asPath.split('=')?.[1]
  const [game, setGame] = useState<GameTypes | null>(null)
  
  useEffect(()=>{
    if (!id) router.back()
    else requestCreateGame()
  },[id])

  const requestCreateGame = async () => {
    try{
      const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/play/`,
      { game_id: id },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
      )
      const receivedGame = {
        id: data.game_id,
        generatedCode: data.generated_code,
        totalGamers: data.total_gamers,
      }
      setGame(receivedGame)
      saveGameToLC(receivedGame)
    }catch(error){
      console.error(error)
    }
  }
  const setExistingGame = () => {
    setGame(getExistingGame() || null)
  }
  return (
    <Box bg='#371C6D' position='relative' w={'full'} h='100vh'>
      <Box position='absolute' top='10%' w='full'>
        <VStack>
          <Text
            color='white'
            fontWeight='bold'
            fontStyle={'italic'}
            fontSize='60px'
          >
            Kahoot!
          </Text>
          <Box px='50px' py='10px' bg='white' color='black' rounded='lg' textAlign='center'>
            <Text fontWeight='bold' fontSize='3xl'>
              Code: {game?.generatedCode || 'Loading...'}
            </Text>
            <Text textAlign='center'>Join with www.kahoot-front.vercel.app</Text>
          </Box>
        </VStack>
      </Box>
      <Box position='absolute' top='45%' textAlign='center' w='full'>
        <Text color='white' fontSize='3xl' fontWeight='bold'>Waiting for others to join...</Text>
      </Box>
    </Box>
  )
}

export default Play