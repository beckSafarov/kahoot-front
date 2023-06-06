import { Avatar, Button, Flex, Text, HStack } from '@chakra-ui/react'
import React from 'react'
import FullNextImage from '../common/FullNextImage'
import Link from 'next/link'

interface KahootProps {
  id: number,
  title: string,
  coverImage: string,
  author?: string,
}

const KahootCard = ({id, title, coverImage, author}:KahootProps) => {
  return (
    <Flex direction={'column'} boxShadow='lg' rounded='md' minHeight='250px'>
      <Flex
        flex='1'
        position='relative'
        w='full'
        h='full'
        justifyContent='center'
      >
        <FullNextImage src={coverImage} alt='car' />
        {/* <Image alt='car' src={coverImage} width={200} height={150}/> */}
      </Flex>
      <Flex flex='1' direction='column' gap={'10px'} py='10px' px='10px'>
        <Text noOfLines={1} textAlign='left' fontSize='lg' fontWeight='600'>
          {title}
        </Text>
        {author && (
          <HStack spacing={'5px'}>
            <Avatar size='xs' name={author} src='' />
            <Text as='small'>{author}</Text>
          </HStack>
        )}
        <Link href={`/play?id=${id}`}>
          <Button w='full' colorScheme='blue' size='sm'>
            Play
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default KahootCard