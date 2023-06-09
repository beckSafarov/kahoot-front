import { Button, HStack, useDisclosure, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import CreateKahootModal from './CreateKahootModal'
import { useNewKahootContext, useUserContext } from '@/hooks/Contexts'
import { SlideValueTypes } from '@/modules/types/Slides'
import { useRouter } from 'next/router'
import FullPageSpinner from '@/modules/common/FullPageSpinner'
import axios from 'axios'
import { getToken } from '@/utils'

const Navbar = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {slides, setData, title, description, visibility, coverImage} = useNewKahootContext()
  const [isLoading, setIsLoading] = useState(false)
  const {addKahoot} = useUserContext()
  const toast = useToast()
  const router = useRouter()

  const throwError = (msg:string):void => {
    toast({
      duration: 6000,
      isClosable: true,
      status: 'error',
      title: 'Error in filling the form',
      description: msg,
      position: 'bottom-right'
    })
  }

  const canSave = useCallback(() => {
    const isTitleSet = !!title
    const allSlideFieldsFilled = slides.every(
      (slide: SlideValueTypes) =>
        slide.title &&
        !slide.options.find((opt) => opt.text === '') &&
        slide.correctOption
    )
    if(!isTitleSet) throwError('Please set a title for the kahoot')
    if(!allSlideFieldsFilled) throwError('Please fill all the fields in the kahoots')
    return isTitleSet && allSlideFieldsFilled
  }, [slides, title])

  const handleExit = () => {
    if(!confirm('Are you sure?')) return
    setData({
      title: '',
      description: '',
      visibility: '',
      coverImage: '',
      slides: [],
      activeSlide: 0,
    })
    router.push('/home')
  }

  const getSlideQuestions = () => {
    return slides.map((slide:SlideValueTypes)=>({
      ...slide, 
      option_a: slide.options[0].text,
      option_b: slide.options[1].text,
      option_c: slide.options[2].text,
      option_d: slide.options[3].text,
      correct_option: slide.correctOption,
      time: slide.seconds
    }))
  }

  const saveToDB = async()=>{
    setIsLoading(true)
    try{
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/games/all`, {
        title,
        description,
        cover_image: coverImage,
        type: visibility,
        questions: getSlideQuestions()
      }, {
        headers: {
          'Authorization':`Bearer ${getToken()}`
        }
      })
      setIsLoading(false)
      toast({
        duration: 4000,
        title: "Saved Successfully",
        description: "You can now exit the creator mode",
        status: 'success'
      })
      return data.id
    }catch(error){
      setIsLoading(false)
      console.error(error)
    }
  }

  const handleSave = async() => {
    if (!canSave()) return
    try{
      const id = await saveToDB()
      addKahoot({ id, title, coverImage, visibility, date: new Date() })
    }catch(error){
      console.error(error)
    }
  }

  return (
    <>
      <FullPageSpinner show={isLoading} />
      <HStack
        position='absolute'
        top='0'
        zIndex='10'
        left='0'
        width='100%'
        py='10px'
        px='100px'
        bg='white'
        justifyContent='space-between'
      >
        <HStack spacing={'20px'}>
          <Link href='/home'>
            <Image
              src='/images/Kahoot-Logo.png'
              width={80}
              height={20}
              alt='logo'
            />
          </Link>
          <Button onClick={onOpen} variant='outline' size='lg'>
            {title || 'Enter kahoot title...'}
          </Button>
        </HStack>
        <HStack spacing={'10px'}>
          <Button onClick={handleExit} colorScheme='gray' variant='solid'>
            Exit
          </Button>
          <Button
            type='button'
            colorScheme='green'
            onClick={handleSave}
            variant='solid'
          >
            Save
          </Button>
        </HStack>
      </HStack>
      <CreateKahootModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Navbar
