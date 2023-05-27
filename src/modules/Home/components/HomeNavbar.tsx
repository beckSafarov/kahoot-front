import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {BsPersonCircle} from 'react-icons/bs'

const links = [
  { label: 'Home', path: '/home' },
  { label: 'Discover', path: '/discover' },
]

const HomeNavbar = () => {
  const {pathname:path} = useRouter()
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
      boxShadow='sm'
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
        {links.map((link, i: number) => (
          <Link key={i} href={link.path}>
            <Text
              borderBottom='3px solid'
              borderColor={link.path === path ? 'purple.700' : 'transparent'}
              color={link.path === path ? 'purple.700' : 'black'}
              fontWeight={'700'}
              py='10px'
            >
              {link.label}
            </Text>
          </Link>
        ))}
      </HStack>
      <HStack spacing={'20px'}>
        <Link href='/creator'>
          <Button colorScheme='blue'>+ New Kahoot</Button>
        </Link>
        <Icon
          cursor='pointer'
          color='blue.500'
          as={BsPersonCircle}
          fontSize='30px'
        />
      </HStack>
    </HStack>
  )
}

export default HomeNavbar
