import { Box, Spinner, VStack } from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Image from 'next/image'


const TestPage = () => {
  const [images, setImages] = useState([])

  useEffect(() => {}, [])
  const sendRequest = async () => {
    const res = await axios.post('http://164.90.213.182/login/', {
      email: 'botto@example.com',
      password: '123456',
    })
  }

  return (
    <>
      <Box
        position='absolute'
        w='full'
        h='100vh'
        zIndex='10'
        bg='gray.200'
        opacity='0.8'
        top='0'
        left='0'
      >
        <Box position='relative' w='full' h='100vh'>
          <>
            <Spinner
              position='absolute'
              top='40%'
              left='50%'
              // transform='translate(50%, 50%)'
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </>
        </Box>
      </Box>
      <button onClick={() => sendRequest()}>Search</button>
      <VStack>
        {images.map((image: string, i: number) => (
          <Image key={i} src={image} height={100} width={100} alt='image' />
        ))}
      </VStack>
    </>
  )
}

export default TestPage