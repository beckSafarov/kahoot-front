import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const FullPageSpinner = ({show}:{show:boolean}) => {
  return (
    <Box
      position='absolute'
      w='full'
      h='100vh'
      zIndex='10'
      bg='gray.600'
      opacity='0.5'
      top='0'
      left='0'
      hidden={!show}
    >
      <Box position='relative' w='full' h='100vh'>
        <>
          <Spinner
            position='absolute'
            top='40%'
            left='50%'
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </>
      </Box>
    </Box>
  )
}

export default FullPageSpinner