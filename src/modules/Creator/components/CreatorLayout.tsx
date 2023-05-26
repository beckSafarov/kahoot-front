import React from 'react'
import Navbar from './Navbar'
import { Box } from '@chakra-ui/react'

const CreatorLayout = ({children, bg}:{children:React.ReactNode, bg?:string}) => {
  return (
    <>
      <Navbar />
      <Box bg={bg} pt='90px' px='100px' minH='100vh'>
        {children}
      </Box>
    </>
  )
}

export default CreatorLayout