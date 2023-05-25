import React from 'react'
import HomeLayout from './HomeLayout'
import KahootCard from '../KahootCard'
import { AbsoluteCenter, Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'

type DashboardDataTypes = {
  title: string,
  image: string,
  author?: string
}

interface DashboardProps {
  data: Array<DashboardDataTypes>,
  title: string
}

const Dashboard = ({data, title}:DashboardProps) => {
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
        {data.length === 0 ? (
          <AbsoluteCenter>
            <Flex
              w='fit-content'
              alignItems='center'
              gap='10px'
              direction='column'
            >
              <Text fontWeight='600' fontSize='2xl' color='gray.400'>
                It looks very empty in here, go ahead and create a kahoot.
              </Text>
              <Button w='100px' colorScheme='blue'>
                Create
              </Button>
            </Flex>
          </AbsoluteCenter>
        ) : (
          <Box
            px='20px'
            pt='20px'
            pb='30px'
            w='full'
            h='full'
            overflowY='scroll'
          >
            <Text mb='20px' fontWeight='600' fontSize='2xl'>
              {title}
            </Text>
            <Grid
              overflowY='scroll'
              h='full'
              templateColumns='repeat(4, 1fr)'
              gap={6}
            >
              {data.map((kahoot, i: number) => (
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

export default Dashboard