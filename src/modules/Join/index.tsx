import React, { useState } from 'react'
import PlayAndJoinContainer from '../common/PlayAndJoinContainer'
import { Box, Button, Input, Text, VStack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import FullPageSpinner from '../common/FullPageSpinner'
import { getHost } from '@/utils'

type JoinFormTypes = {
  username: string, 
  pin: number | null
}

type Error = {
  toString(): void
}

const toastCommons = {
  duration: 6000,
  isClosable: true
}

const Join = () => {
  const [values, setValues] = useState<JoinFormTypes>({
    username: '',
    pin: null,
  })
  const [error, setError] = useState('Sample Error')
  const [hasJoined, setHasJoined] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const isFormValid = ()=>{
    return values?.username && values?.pin
  }

  const handleJoinSuccess = () => {
    setError('')
    setHasJoined(true)
    toast({
      ...toastCommons,
      title: 'Joined Successfully',
      description: 'Wait until the game starts',
      status: 'success',
    })
  }
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!isFormValid()) return
    setIsLoading(true)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/play/join`, {
        image: "",
        username: values.username,
        generated_code: values.pin
      })
      setIsLoading(false)
      handleJoinSuccess()
    }catch(error:any) {
      setIsLoading(false)
      console.error(error)
      toast({
        ...toastCommons, 
        title: "Joining Error",
        description: error?.toString(),
        status: 'error'
      })
    }
  }

  const handleChange = (e:React.FormEvent<HTMLInputElement>):void => {
    const {name, value} = e.currentTarget
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <PlayAndJoinContainer>
      <FullPageSpinner show={isLoading} />
      <VStack w='full' position='absolute' top='30%'>
        <Text
          color='white'
          fontWeight='bold'
          fontStyle={'italic'}
          fontSize='60px'
        >
          Kahoot!
        </Text>
        {hasJoined ? (
          <Box bg='white' p='20px' rounded='md'>
            <Text color='gray.600' fontSize='3xl'>
              Waiting to be admitted...
            </Text>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <VStack bg='white' spacing={2} p='20px' rounded='md'>
              <Input
                name='username'
                type='text'
                colorScheme='gray'
                placeholder='Username'
                onChange={handleChange}
              />
              <Input
                name='pin'
                type='number'
                colorScheme='gray'
                placeholder='Game PIN'
                onChange={handleChange}
              />
              <Button type='submit' colorScheme='blue' w='full'>
                Enter
              </Button>
            </VStack>
          </form>
        )}
      </VStack>
      <Box
        position='absolute'
        bottom='20px'
        w='full'
        textAlign='center'
        color='white'
      >
        <VStack>
          <p>Create your own kahoot for free at {getHost() + '/creator'}</p>
          <div>Terms | Privacy</div>
        </VStack>
      </Box>
    </PlayAndJoinContainer>
  )
}

export default Join