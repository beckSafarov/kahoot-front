import { Button, HStack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <HStack
      position='absolute'
      top='0'
      zIndex='10'
      left='0'
      width='100%'
      py='10px'
      px='100px'
      bg='white'
      justifyContent='space-between'
    >
      <HStack spacing={'20px'}>
        <Link href='/'>
          <Image
            src='/images/Kahoot-Logo.png'
            width={80}
            height={20}
            alt='logo'
          />
        </Link>
        <Button colorScheme='blue'>News</Button>
      </HStack>
      <HStack spacing={'20px'}>
        <Link href={'/auth/signup'}>
          <Text color='black' variant='outline' fontWeight={'700'}>
            Sign up
          </Text>
        </Link>
        <Link href={'/auth/login'}>
          <Text color='black' fontWeight={'700'}>
            Log in
          </Text>
        </Link>
      </HStack>
    </HStack>
  )
}

export default Navbar