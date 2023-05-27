import { Box, Flex, Grid, GridItem, Input, Radio, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const SlideSection = ({flex}:{flex:string}) => {
  const colors = ['red', 'blue', 'orange', 'green']
  const shapes = [
    'polygon(50% 0%, 0% 100%, 100% 100%);',
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    'circle(50% at 50% 50%)',
    'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
  ]
  return (
    <VStack flex={flex || '5'} bg='inherit' px='20px' py='20px' spacing={10}>
      <Input
        variant='filled'
        bg='white'
        placeholder='Start typing your question'
        textAlign={'center'}
        boxShadow='md'
        fontSize='2xl'
        height='50px'
      />
      <Image
        src={'/images/kahoot-bg-placeholder.png'}
        width={600}
        height={600}
        alt='image'
      />
      <Box w='full'>
        <Grid w='full' h='full' templateColumns={'repeat(2, 1fr)'} gap={2}>
          {colors.map((color: string, i: number) => (
            <GridItem
              rounded='md'
              key={i}
              height='80px'
              // bg={color}
              border='1px solid #ccc'
              w='100%'
              color='white'
            >
              <Flex h='full'>
                <Flex
                  flex='1'
                  justifyContent='center'
                  alignItems='center'
                  bg={colors[i]}
                  h='full'
                >
                  <Box
                    clipPath={shapes[i]}
                    bg='white'
                    w='25px'
                    h='25px'
                  />
                </Flex>
                <Box flex='5' px='10px'>
                  <Input placeholder={`option ${i+1}`} h='full' variant='unstyled' color='gray.400'/>
                </Box>
                <Box flex='1' px='10px'>
                  
                </Box>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </VStack>
  )
}

export default SlideSection