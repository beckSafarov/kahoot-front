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
import React, { useCallback, useEffect, useState, useTransition } from 'react'
import PickImageModal from './PickImageModal'
import { useNewKahootContext } from '@/hooks/Contexts'
import { useRouter } from 'next/router'
import { OptionTypes, SlideOptionTypes, SlideValueTypes } from '@/modules/types/Slides'


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
  const router = useRouter()
  const [pickImage, setPickImage] = useState(false)
  const {addBasicSlide, updateSlide, slides, activeSlide} = useNewKahootContext()
  const [pending, setTransition] = useTransition()
  const [values, setValues] = useState<SlideValueTypes>({
    title: '',
    image: '',
    options: [],
    correctOption: ''
  })
  
  useEffect(()=>{
    initValues()
  },[slides, activeSlide])

  useEffect(()=>{
    monitorCompletion()
  },[values])

  const initValues = ()=>{
    const currSlideData = slides.find((slide) => slide['id'] === activeSlide)
    if(currSlideData) setValues(currSlideData)
    return 
  }
  // console.log({slides, values})
  const handleOptionTextEdit = (name:string, value:string | boolean):void => {
    const [optionLetter, field] = name.split('-')
    const updatedOptions = values.options.map((opt: SlideOptionTypes) => {
      return opt.id === optionLetter ? { ...opt, [field]: value } : opt
    })
    console.log(updatedOptions)
    setValues({...values, options: updatedOptions})
  }

  const handleCorrectOptionChange = (name:string) => {
    const correctOption = name.split('-')[0]
    const updatedValues = { ...values, correctOption}
    setValues(updatedValues)
    updateSlide(updatedValues)
  }

  const fieldsAreValid = useCallback(() => {
    const hasTitle = !!values.title
    const allOptionsFilled = values.options.every((opt) => opt.text !== '')
    const hasRightOption = !!values.correctOption
    return hasTitle && allOptionsFilled && hasRightOption
  }, [values])

  const monitorCompletion = () => {
    if (!fieldsAreValid()) return
    setValues(v=>({...v, isComplete: true}))
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>):void => {
    const {name, value} = e.currentTarget
    if(name.match(/title|image/)){
      return setValues({ ...values, [name]: value })
    }
    if (name.match(/correctOption/g)) {
      return handleCorrectOptionChange(name)
    }
    handleOptionTextEdit(name, value)
  }

  const handleAddClick = () => {
    if(!fieldsAreValid()) return
    updateSlide(values)
    addBasicSlide()
  }

  const handleImagePicked = (image:string) => {
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
                    isChecked={option.id === values.correctOption}
                    name={`${option.id}-correctOption`}
                    onChange={handleChange}
                  />
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Flex w='full' justifyContent='center' gap='20px'>
        <Button isDisabled={!fieldsAreValid()} onClick={handleAddClick} variant='outline' colorScheme='blue'>
          Add +
        </Button>
      </Flex>
    </VStack>
  )
}

export default SlideSection
