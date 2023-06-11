import React from 'react'
import Navbar from './components/Navbar'
import { Box, Button, HStack, Stack, Text} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

const Landing = () => {
  return (
    <>
      <Navbar />
      <Box
        height='100vh'
        width='100%'
        backgroundImage={'https://kahoot.com/files/2022/12/background.jpg'}
        backgroundPosition={'center'}
        backgroundRepeat={'repeat'}
        pt='100px'
      >
        <HStack pl='100px' transform={'translate(0, 30%)'}>
          <Box
            flex='1'
            display='flex'
            flexDirection='column'
            gap='20px'
          >
            <Text fontSize='40px' color='white' fontWeight='600'>
              More productive and engaging meetings for your professional
              audience with Kahoot! 360
            </Text>
            <Link href='/join'>
              <Button maxWidth='180px' colorScheme='blue' fontSize='20px'>
                Play with us
              </Button>
            </Link>
          </Box>
          <Stack flex='1' justifyContent='center' alignItems='center'>
            <Image
              alt='ew'
              src='https://thumb.tildacdn.com/tild6563-3039-4132-b664-356163646536/-/resize/462x/-/format/webp/___1.png'
              width={300}
              height={600}
              className='animation-bounce'
            />
          </Stack>
        </HStack>
      </Box>
    </>
  )
}

export default Landing