import { Avatar, Box, Button, Flex, Text, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import FullNextImage from '../common/FullNextImage'

interface KahootProps {
  title: string,
  image: string,
  author?: string,
}

const KahootCard = ({title, image, author}:KahootProps) => {
  return (
    <Flex direction={'column'} boxShadow='lg' rounded='md'>
      <Box position='relative' w='full' h='full'>
        <FullNextImage src={image} alt='car'/>
      </Box>
      <Flex direction='column' gap={'10px'} py='10px' px='10px'>
        <Text textAlign='left' fontSize='lg' fontWeight='600'>
          {title}
        </Text>
        {author && (
          <HStack spacing={'5px'}>
            <Avatar size='xs' name={author} src='' />
            <Text as='small'>{author}</Text>
          </HStack>
        )}
        <Button w='full' colorScheme='blue' size='sm'>
          Play
        </Button>
      </Flex>
    </Flex>
  )
}

export default KahootCard