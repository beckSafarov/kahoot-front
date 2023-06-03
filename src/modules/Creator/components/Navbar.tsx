import { Button, HStack, Input, Text, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import CreateKahootModal from './CreateKahootModal'
import { useNewKahootContext } from '@/hooks/Contexts'
import { SlideValueTypes } from '@/modules/types/Slides'
import { useRouter } from 'next/router'

const Navbar = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {slides, setData} = useNewKahootContext()
  const {title} = useNewKahootContext()
  const router = useRouter()
  const canSave = useMemo(() => {
    return slides.every(
      (slide: SlideValueTypes) =>
        slide.title &&
        slide.options.every((opt) => opt.text) &&
        slide.correctOption
    )
  }, [slides])

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

  const handleSave = () => {
    if(!canSave) return
    console.log('saved')
  }

  return (
    <>
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
          <Link href='/'>
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
            isDisabled={!canSave}
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
