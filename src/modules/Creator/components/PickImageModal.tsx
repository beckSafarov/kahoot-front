import ModalBase from '@/modules/common/ModalBase'
import { Box, Button, Flex, Grid, GridItem, HStack, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { getPixabayImageRequest } from '@/utils'
import Image from 'next/image'
import FullNextImage from '@/modules/common/FullNextImage'

interface PickImageProps {
  isOpen: boolean, 
  onClose(): void
  
}
const PickImageModal = ({isOpen, onClose}:PickImageProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [images, setImages] = useState([])
  
  const handleSearch = async() => {
    const keywords = searchTerm.split(' ').join('+')
    const { data } = await axios.get(getPixabayImageRequest(keywords))
    const resImages = data.hits.map(
      (singleData: { webformatURL: string; largeImgURL: string }) => {
        return {
          sm: singleData.webformatURL,
          lg: singleData.largeImgURL,
        }
      }
    )
    setImages(resImages)
  }
  console.log(images)
  return (
    <ModalBase
      size='xl'
      isOpen={isOpen}
      onClose={onClose}
      title='Pick an image'
    >
      <VStack spacing={5} height='500px' overflow='auto'>
        <Flex w='full' gap={2}>
          <Box flex='3'>
            <Input
              variant='filled'
              value={searchTerm}
              placeholder='search'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Box flex='1'>
            <Button w='full' onClick={handleSearch} colorScheme='blue'>
              Search
            </Button>
          </Box>
        </Flex>
        {images.length > 0 && (
          <Grid
            rowGap={1}
            columnGap={2}
            overflowY='auto'
            templateColumns={'repeat(4, 1fr)'}
          >
            {images.map((image: { sm: string; lg: string }, i: number) => (
              <GridItem position='relative' cursor='pointer' key={i}>
                <FullNextImage src={image.sm} alt='image' />
              </GridItem>
            ))}
          </Grid>
        )}
      </VStack>
    </ModalBase>
  )
}

export default PickImageModal