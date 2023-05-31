import { useNewKahootContext } from '@/hooks/Contexts'
import { Box, Center, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const SlidesSideBar = ({ flex }: { flex: string }) => {
  const { slides, activeSlide, setActiveSlide } = useNewKahootContext()
  
  return (
    <VStack flex={flex || 1} py='10px' bg='white'>
      {slides.map((slide, i: number) => (
        <VStack onClick={() => setActiveSlide(slide['id'])} key={i}>
          <Text>Slide {i+1}</Text>
          <Box
            border={
              slide['id'] === activeSlide
                ? '2px solid #808080'
                : '2px solid transparent'
            }
            key={slide}
            w='150px'
            h='100px'
            bg='gray.200'
            rounded='md'
            cursor='pointer'
            fontSize='14px'
          >
            <Text fontWeight='semibold' textAlign='center' noOfLines={1}>
              {slide['title'] || 'Untitled'}
            </Text>
            <Center mt='10px'>
              <Image src={slide['image']} alt='' width={80} height={40} />
            </Center>
          </Box>
        </VStack>
      ))}
    </VStack>
  )
}

export default SlidesSideBar
