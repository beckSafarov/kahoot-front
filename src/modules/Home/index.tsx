import React from 'react'
import HomeNavbar from './components/HomeNavbar'
import { AbsoluteCenter, Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import HomeLayout from './components/HomeLayout'
import KahootCard from './KahootCard'

const myKahoots = [
  { title: 'Car Logos', image: '/images/car.webp' },
  { title: 'Cool Cars', image: '/images/car.webp' },
  { title: 'Cool Cars', image: '/images/car.webp' },
  { title: 'Cool Cars', image: '/images/car.webp' },
  { title: 'Cool Cars', image: '/images/car.webp' },
]
const Home = () => {
  return (
    <HomeLayout bg='gray.100'>
      <Box
        position='relative'
        minH='50vh'
        w='full'
        bg='white'
        rounded='md'
        boxShadow='md'
      >
        {myKahoots.length === 0 ? (
          <AbsoluteCenter>
            <Flex
              w='fit-content'
              alignItems='center'
              gap='10px'
              direction='column'
            >
              <Text fontWeight='600' fontSize='2xl' color='gray.400'>
                No Kahoots To Display
              </Text>
              <Button w='100px' colorScheme='blue'>
                Create
              </Button>
            </Flex>
          </AbsoluteCenter>
        ) : (
          <Box px='20px' pt='20px' pb='30px' w='full' h='full' overflowY='scroll'>
            <Text mb='20px' fontWeight='600' fontSize='2xl'>
              My Kahoots
            </Text>
            <Grid overflowY='scroll' h='full' templateColumns='repeat(4, 1fr)' gap={6}>
              {myKahoots.map((kahoot, i: number) => (
                <GridItem key={i} w='100%'>
                  <KahootCard {...kahoot} key={i} />
                </GridItem>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </HomeLayout>
  )
}

export default Home
