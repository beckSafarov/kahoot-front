import { Button, HStack, Input, Text, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import CreateKahootModal from './CreateKahootModal'

const Navbar = () => {
  const [title, setTitle] = useState('')
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
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
          <Button onClick={onOpen} variant='outline' size='lg'>
            Enter kahoot title...
          </Button>
        </HStack>
        <HStack spacing={'10px'}>
          <Link href={'/home'}>
            <Button colorScheme='gray' variant='solid'>
              Exit
            </Button>
          </Link>
          <Link href={'/auth/login'}>
            <Button colorScheme='blackAlpha' variant='solid'>
              Save
            </Button>
          </Link>
        </HStack>
      </HStack>
      <CreateKahootModal isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default Navbar
