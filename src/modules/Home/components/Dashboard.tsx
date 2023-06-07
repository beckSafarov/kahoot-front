import React from 'react'
import HomeLayout from './HomeLayout'
import KahootCard from '../KahootCard'
import { AbsoluteCenter, Box, Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import { useUserContext } from '@/hooks/Contexts'
import Link from 'next/link'
import { KahootTypes } from '@/modules/types/Home'


interface DashboardProps {
  data: Array<KahootTypes>,
  title: string
}

const Dashboard = ({data, title}:DashboardProps) => {
  const {userInfo, kahoots} = useUserContext()
  return (
    <HomeLayout bg='gray.100'>
      <Flex gap='20px'>
        <Box
          flex='1'
          order='2'
          boxShadow='md'
          bg='white'
          height='400px'
          px='20px'
          pt='20px'
          pb='30px'
        >
          <Text mb='20px' fontWeight='600' fontSize='2xl'>
            User 😎
          </Text>
          <Flex>
            <VStack flex='1' textAlign='left' alignItems='flex-start'>
              <Text fontWeight='bold'>Email:</Text>
              <Text fontWeight='bold'>Kahoots:</Text>
            </VStack>
            <VStack flex='2' alignItems='flex-start' pl='5px'>
              <Text>{userInfo.email}</Text>
              <Text>{kahoots.length}</Text>
            </VStack>
          </Flex>
        </Box>
        <Box
          position='relative'
          minH='50vh'
          w='full'
          bg='white'
          rounded='md'
          boxShadow='md'
          flex='4'
          order='1'
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
                <Link href='/creator'>
                  <Button w='100px' colorScheme='blue'>
                    Create
                  </Button>
                </Link>
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
                {data.map((kahoot:KahootTypes, i: number) => (
                  <GridItem key={i} w='100%'>
                    <KahootCard {...kahoot} key={i} />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Flex>
    </HomeLayout>
  )
}

export default Dashboard