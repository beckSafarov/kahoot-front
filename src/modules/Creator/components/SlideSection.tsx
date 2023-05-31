import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Input,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PickImageModal from './PickImageModal'
import { useNewKahootContext } from '@/hooks/Contexts'

type SlideOptionTypes = {
  id: string
  text: string
  isTrue: boolean
}

type SlideValueTypes={
  title: string, 
  image: string,
  options: Array<SlideOptionTypes>
}
type OptionTypes = {
  [id:string]: string,
  color: string,
  shape: string
}
const options = [
  { id: 'a', color: 'red', shape: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
  {
    id: 'b',
    color: 'blue',
    shape: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  },
  { id: 'c', color: 'orange', shape: 'circle(50% at 50% 50%)' },
  { id: 'd', color: 'green', shape: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)' },
]

interface SlideSectionProps {
  flex: string
}

const SlideSection = ({ flex }: SlideSectionProps) => {
  const [pickImage, setPickImage] = useState(false)
  const {addBasicSlide, updateSlide, slides, activeSlide} = useNewKahootContext()
  const [values, setValues] = useState<SlideValueTypes>({
    title: '',
    image: '',
    options: [],
  })

  useEffect(()=>{
    initValues()
  },[slides, activeSlide])

  const initValues = ()=>{
    const currSlideData = slides.find((slide) => slide['id'] === activeSlide)
    if(currSlideData) setValues(currSlideData)
    return 
  }
  // console.log({slides, values})
  const handleOptionEdit = (name:string, value:string | boolean):void => {
    const [optionLetter, field] = name.split('-')
    const updatedOptions = values.options.map((opt: SlideOptionTypes) => {
      return opt.id === optionLetter ? { ...opt, [field]: value } : opt
    })
    console.log(updatedOptions)
    setValues({...values, options: updatedOptions})
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>):void => {
    const {name, value, checked} = e.currentTarget
    if(name.match(/title|image/)){
      setValues({...values, [name]:value})
      return 
    }
    handleOptionEdit(name, value || checked)
  }

  const handleAddClick = () => addBasicSlide()

  const handleImagePicked = (image:string) => {
    // updateSlide(values)
    setValues({ ...values, image })
    updateSlide({...values, image})
  }

  const handleBlur = () => updateSlide(values)

  return (
    <VStack
      flex={flex || '5'}
      bg='inherit'
      px='20px'
      py='20px'
      spacing={10}
      height='100%'
      overflowY='hidden'
    >
      <Input
        name='title'
        value={values.title}
        onChange={handleChange}
        variant='filled'
        bg='white'
        placeholder='Start typing your question'
        textAlign={'center'}
        boxShadow='md'
        fontSize='2xl'
        height='50px'
        onBlur={handleBlur}
      />
      <Flex position='relative' width='fit-content' flexDir='column' gap='10px'>
        <Image src={values.image} width={400} height={400} alt='image' />
        <Button
          onClick={() => setPickImage(true)}
          variant='ghost'
          boxShadow='md'
        >
          Change
        </Button>
      </Flex>
      <PickImageModal
        isOpen={pickImage}
        onClose={()=>setPickImage(false)}
        onImagePicked={handleImagePicked}
      />
      <Box w='full'>
        <Grid w='full' h='full' templateColumns={'repeat(2, 1fr)'} gap={2}>
          {options.map((option: OptionTypes, i: number) => (
            <GridItem
              rounded='md'
              key={i}
              height='80px'
              border='1px solid #ccc'
              w='100%'
              color='white'
              bg='white'
            >
              <Flex h='full'>
                <Flex
                  flex='1'
                  justifyContent='center'
                  alignItems='center'
                  bg={option.color}
                  h='full'
                >
                  <Box clipPath={option.shape} bg='white' w='25px' h='25px' />
                </Flex>
                <Box flex='5' px='10px' color='black'>
                  <Input
                    name={`${option.id}-text`}
                    value={values?.options[i]?.text || ''}
                    onChange={handleChange}
                    placeholder={`option ${i + 1}`}
                    h='full'
                    onBlur={()=>updateSlide(values)}
                    variant='unstyled'
                    sx={{color: 'blackAlpha'}}
                  />
                </Box>
                <Flex
                  alignItems='center'
                  justifyContent='center'
                  flex='1'
                  px='10px'
                >
                  <Checkbox
                    isChecked={values?.options?.[i]?.isTrue}
                    name={`${option.id}-isTrue`}
                    onChange={handleChange}
                  />
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Flex w='full' justifyContent='center' gap='20px'>
        <Button onClick={handleAddClick} variant='outline' colorScheme='blue'>
          Add +
        </Button>
        <Button hidden={slides.length < 2} variant='solid' colorScheme='red'>
          End
        </Button>
      </Flex>
    </VStack>
  )
}

export default SlideSection
