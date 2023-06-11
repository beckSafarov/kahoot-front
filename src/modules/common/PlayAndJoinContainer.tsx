import { Box } from '@chakra-ui/react'
import React from 'react'

const PlayAndJoinContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box bg='#371C6D' position='relative' w={'full'} h='100vh'>
      {children}
    </Box>
  )
}

export default PlayAndJoinContainer
