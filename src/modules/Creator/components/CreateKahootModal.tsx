import ModalBase from '@/modules/common/ModalBase'
import { Box, Button, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Textarea, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import Image from 'next/image'
import React, { useState } from 'react'
import PickImageModal from './PickImageModal'
import { useNewKahootContext } from '@/hooks/Contexts'
import * as Yup from 'yup'
interface CreateKahootModalProps {
  isOpen: boolean
  onClose(): void
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Please enter the description'),
  description: Yup.string()
    .required('Please enter the description'),
})

type CreateKahootTypes = {
  title: string,
  description: string,
  visibility: string,
}

const CreateKahootModal = ({ isOpen, onClose }: CreateKahootModalProps) => {
  const [openPickImage, setOpenPickImage] = useState(false)
  const {setData} = useNewKahootContext()
  const [coverImage, setCoverImage] = useState<string>(
    '/images/kahoot-bg-placeholder.png'
  )

  const handleSubmit = (values:CreateKahootTypes) => {
    setData?.({
      ...values,
      coverImage,
    })
    onClose()
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      visibility: 'public',
    },
    onSubmit: handleSubmit,
    validationSchema
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
                name='visibility'
                onBlur={formik.handleBlur}
                onClick={formik.handleChange}
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
                    src={coverImage}
                    width={300}
                    height={300}
                    alt='placeholder'
                    style={{borderRadius: '10px'}}
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
      <PickImageModal onImagePicked={(image:string)=>setCoverImage(image)} isOpen={openPickImage} onClose={()=>setOpenPickImage(false)} />
    </>
  )
}

export default CreateKahootModal