import React, { useState, useEffect} from 'react'
import CreatorLayout from './components/CreatorLayout'
import { useNewKahootContext } from '@/hooks/Contexts'
import { Flex} from '@chakra-ui/react'
import SlidesSideBar from './components/SlidesSideBar'
import SlideSection from './components/SlideSection'
import SettingsSection from './components/SettingsSection'

const Creator = () => {
  const {addBasicSlide, slides} = useNewKahootContext()

  useEffect(()=>{
    if(slides.length < 1) {
      addBasicSlide()
    }
  },[slides])

  return (
    <CreatorLayout bg='gray.100'>
      <Flex minHeight='91vh'>
        <SlidesSideBar flex='1' />
        <SlideSection flex='5' />
        <SettingsSection flex='1'/>
      </Flex>
    </CreatorLayout>
  )
}

export default Creator