import React from 'react'
import CreatorLayout from './components/CreatorLayout'
import { useNewKahootContext } from '@/hooks/Contexts'
import { Box, Flex, Grid, GridItem, Input, Text, VStack } from '@chakra-ui/react'
import SlidesSideBar from './components/SlidesSideBar'
import Image from 'next/image'
import SlideSection from './components/SlideSection'

const colors = ['red', 'blue', 'orange', 'green']

const Creator = () => {
  const {addSlide} = useNewKahootContext()
  const slides = [1, 2, 3]
  return (
    <CreatorLayout bg='gray.100'>
      <Flex>
        <SlidesSideBar flex='1' />
        <SlideSection flex='5'/>
        <VStack flex='1.5' bg='yellow'>
          <div>Settings here</div>
        </VStack>
      </Flex>
    </CreatorLayout>
  )
}

export default Creator