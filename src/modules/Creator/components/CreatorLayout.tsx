import React from 'react'
import Navbar from './Navbar'
import { Box } from '@chakra-ui/react'

const CreatorLayout = ({children, bg}:{children:React.ReactNode, bg?:string}) => {
  return (
    <>
      <Navbar />
      <Box position='relative' bg={bg} pt='70px' minH='100vh'>
        {children}
      </Box>
    </>
  )
}

export default CreatorLayout