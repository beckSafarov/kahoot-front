import { Avatar, Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getHost, getToken } from '@/utils'
import unionBy from 'lodash/unionBy'
import {FaChevronRight} from 'react-icons/fa'

type GameTypes = {
  id?: number, 
  generatedCode: number, 
  totalGamers: number
}

type GamerTypes = {
  username: string, 
  image: string, 
  points: number
}

type CreateGameResTypes = {
  game_id: number,
  generated_code: number, 
  total_gamers: number
}

const Play = () => {
  const router = useRouter()
  const id = router.asPath.split('=')?.[1]
  const [game, setGame] = useState<GameTypes | null>(null)
  const [gamers, setGamers] = useState<any>([])
  
  useEffect(()=>{
    if (!id) router.back()
    else requestCreateGame()
    if(game?.id) setInterval(getJoinedPlayers, 5000)
  },[id, game?.id])

  const handleCreateGameSuccess = (data:CreateGameResTypes) => {
    const receivedGame = {
      id: data.game_id,
      generatedCode: data.generated_code,
      totalGamers: data.total_gamers,
    }
    setGame(receivedGame)
  }

  const requestCreateGame = async () => {
    try{
      const { data } = await axios.post<CreateGameResTypes>(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/play/`,
        { game_id: id },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      handleCreateGameSuccess(data)
    }catch(error){
      console.error(error)
    }
  }

  const getJoinedPlayers = async() => {
    if(!game?.id) return
    try{
      const {data} = await axios.get<[GamerTypes] | []>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/play/gamers?code=${game?.generatedCode}`)
      setGamers(unionBy(gamers, data, 'username'))
    }catch(error){
      console.error(error);
    }
  }
  
  return (
    <Box bg='#371C6D' position='relative' w={'full'} h='100vh'>
      <Box position='absolute' top='30px' right='20px'>
        <Button isDisabled={gamers.length < 1} variant='solid' colorScheme='blue'>
          {' '}
          Start Game <FaChevronRight/>
        </Button>
      </Box>
      <Box position='absolute' top='10%' w='full'>
        <VStack>
          <Text
            color='white'
            fontWeight='bold'
            fontStyle={'italic'}
            fontSize='40px'
          >
            Kahoot!
          </Text>
          <Box
            px='50px'
            py='10px'
            bg='white'
            color='black'
            rounded='lg'
            textAlign='center'
          >
            <Text fontWeight='bold' fontSize='4xl'>
              Code: {game?.generatedCode || 'Loading...'}
            </Text>
            <Text textAlign='center'>Join with www.{getHost()}</Text>
          </Box>
        </VStack>
      </Box>
      <Box position='absolute' top='45%' textAlign='center' w='full'>
        {gamers.length < 1 ? (
          <Text color='white' fontSize='3xl' fontWeight='bold'>
            Waiting for others to join...
          </Text>
        ) : (
          <Box position='relative'>
            <Text fontSize='2xl' pb='20px' color='white' fontWeight='bold'>
              Joined: {gamers.length}
            </Text>
            <Flex
              flexWrap={'wrap'}
              justifyContent='center'
              p='20px'
              rounded='md'
              bg='white'
              margin='0 auto'
              maxWidth='800px'
              gap='30px'
            >
              {gamers.map((gamer: GamerTypes, i: number) => (
                <VStack rounded='md' minWidth='100px' spacing={1}>
                  <Avatar name={gamer.username} src={gamer.image} />
                  <Text noOfLines={1} fontWeight='semibold'>
                    {gamer.username}
                  </Text>
                </VStack>
              ))}
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Play