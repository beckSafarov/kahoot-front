import React from 'react'
import HomeNavbar from './HomeNavbar'
import { Box } from '@chakra-ui/react'

const HomeLayout = ({children, bg}:{children:React.ReactNode, bg?:string}) => {
  return (
    <>
      <HomeNavbar/>
      <Box bg={bg} pt='90px' px='50px' minH='100vh'>
        {children}
      </Box>
    </>
  )
}

export default HomeLayout