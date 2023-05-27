import ModalBase from '@/modules/common/ModalBase'
import { Box, Button, Flex, Grid, GridItem, HStack, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getPixabayImageRequest } from '@/utils'
import FullNextImage from '@/modules/common/FullNextImage'

type SinglePixabayResType = { webformatURL: string; largeImageURL: string }

type DataType = {
  hits: Array<SinglePixabayResType>
}

const getImagesFromRes = (data: DataType) => {
  return data.hits.map((singleData: SinglePixabayResType) => {
    return {
      webformatURL: singleData.webformatURL,
      largeImageURL: singleData.largeImageURL,
    }
  })
}

interface PickImageProps {
  isOpen: boolean, 
  onImagePicked(image:string): void
  onClose(): void
  
}
const PickImageModal = ({isOpen, onClose, onImagePicked}:PickImageProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [images, setImages] = useState<[SinglePixabayResType] | []>([])

  useEffect(()=>{
    if(images.length < 1) initData()
  }, [images])
  
  const initData = async() => {
    const {data} = await axios.get(getPixabayImageRequest('nature'))
    const resImages = data.hits.map((singleData: SinglePixabayResType) => {
      return { 
        webformatURL: singleData.webformatURL,
        largeImageURL: singleData.largeImageURL,
      }
    })
    setImages(resImages)
  }
  
  const handleSearch = async() => {
    const keywords = searchTerm.split(' ').join('+')
    const { data } = await axios.get(getPixabayImageRequest(keywords))
    const resImages = data.hits.map((singleData: SinglePixabayResType) => {
      return {
        webformatURL: singleData.webformatURL,
        largeImageURL: singleData.largeImageURL,
      }
    })
    setImages(resImages)
  }

  const handleClose = () => {
    if(!searchTerm) return onClose()
    setSearchTerm('')
    setImages([])
    onClose()
  }

  const handleImageClick = (image:string) => {
    onImagePicked(image)
    handleClose()
  }

  return (
    <ModalBase
      size='xl'
      isOpen={isOpen}
      onClose={handleClose}
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
            {images.map((image: SinglePixabayResType, i: number) => (
              <GridItem
                onClick={() => handleImageClick(image.largeImageURL)}
                position='relative'
                cursor='pointer'
                key={i}
                _hover={{opacity: 0.8, transition: '0.2s'}}
              >
                <FullNextImage src={image.webformatURL} alt='image' />
              </GridItem>
            ))}
          </Grid>
        )}
      </VStack>
    </ModalBase>
  )
}

export default PickImageModal