import ModalBase from '@/modules/common/ModalBase'
import { Box, Button, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Textarea, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import Image from 'next/image'
import React, { useState } from 'react'
import PickImageModal from './PickImageModal'

interface CreateKahootModalProps {
  isOpen: boolean
  onClose(): void
}

type CreateKahootTypes = {
  title: string,
  description: string,
  visibility: string,
  coverImage: string
}

const CreateKahootModal = ({ isOpen, onClose }: CreateKahootModalProps) => {
  const [openPickImage, setOpenPickImage] = useState(false)
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      visibility: 'public',
      coverImage: '/images/kahoot-bg-placeholder.png'
    },
    onSubmit: (values:CreateKahootTypes)=>{
      console.log(values)
    }
  })
  return (
    <>
      <ModalBase isOpen={isOpen} onClose={onClose} title='Kahoot Summary'>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={2}>
            <FormControl>
              <FormLabel>Kahoot Title</FormLabel>
              <Input
                name='title'
                type='text'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name='description'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Visibility</FormLabel>
              <RadioGroup
                onChange={formik.handleChange}
                value={formik.values.visibility}
              >
                <Stack direction='row' spacing={10}>
                  <Radio value='private'>Private</Radio>
                  <Radio value='public'>Public</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Cover</FormLabel>
              <center>
                <Box w='fit-content' boxShadow='md'>
                  <Image
                    src='/images/kahoot-bg-placeholder.png'
                    width={300}
                    height={300}
                    alt='placeholder'
                  />
                </Box>
                <Box py='10px'>
                  <Button size='sm' colorScheme='blue' onClick={()=>setOpenPickImage(true)}>
                    Change
                  </Button>
                </Box>
              </center>
            </FormControl>
            <Flex direction='row' pt='20px' pb='10px' w='full' gap='10px'>
              <Button
                onClick={onClose}
                w='50%'
                colorScheme='gray'
                variant='solid'
                type='reset'
              >
                Cancel
              </Button>
              <Button type='submit' w='50%' colorScheme='blue' variant='solid'>
                Submit
              </Button>
            </Flex>
          </VStack>
        </form>
      </ModalBase>
      <PickImageModal isOpen={openPickImage} onClose={()=>setOpenPickImage(false)} />
    </>
  )
}

export default CreateKahootModal