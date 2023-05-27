import { Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const SlidesSideBar = ({flex}:{flex:string}) => {
  const slides = [1, 2, 3]
  return (
    <VStack flex={flex || 1} py='10px' bg='white'>
      {slides.map((slide: number, i: number) => (
        <VStack key={i}>
          <Text>{slide} Slide</Text>
          <Box
            border={i === 0 ? '2px solid #808080' : '2px solid transparent'}
            key={slide}
            w='150px'
            h='100px'
            bg='gray.200'
            rounded='md'
            cursor='pointer'
          ></Box>
        </VStack>
      ))}
    </VStack>
  )
}

export default SlidesSideBar