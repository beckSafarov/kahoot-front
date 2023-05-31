import React from 'react'
import Navbar from './Navbar'
import { Box } from '@chakra-ui/react'

const CreatorLayout = ({children, bg}:{children:React.ReactNode, bg?:string}) => {
  return (
    <Box height='100vh'>
      <Navbar />
      <Box position='relative' bg={bg} pt='70px' minH='100vh'>
        {children}
      </Box>
    </Box>
  )
}

export default CreatorLayout