import { VStack } from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Image from 'next/image'


const TestPage = () => {
  const [images, setImages] = useState([])

  useEffect(() => {}, [])
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODYyMTE2NjR9.nLvVJEwPy522hCeUZFtleN_MSPNQEaHasKjK-xCrNvc
  const sendRequest = async () => {
    const res = await axios.post('http://164.90.213.182/login/', {
      email: 'botto@example.com',
      password: '123456',
    })
    // const res = await fetch('http://164.90.213.182/users/', {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: "robin@example.com",
    //     password1: "123456",
    //     password2: "123456",
    //   })
    // })
    // const res = await axios.post('/api/postusers', {
    //   email: 'imranHosein@gmail.com',
    //   password1: '123456',
    //   password2: '123456',
    // })
    // const res = await fetch('/api/postusers', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: 'begzod@gmail.com',
    //     password1: '123456',
    //     password2: '123456',
    //   }),
    // })
    console.log(res)
  }

  const handleSearch = async () => {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_KEY}&q=yellow+flowers&image_type=photo`
    )
    console.log(data)
    const receivedImages = data.hits.map(
      (res: { largeImgUrl: string }) => res.largeImgUrl
    )
    console.log(receivedImages)
    setImages(receivedImages)
  }

  return (
    <>
      <button onClick={() => sendRequest()}>Search</button>
      <VStack>
        {images.map((image: string, i: number) => (
          <Image src={image} height={100} width={100} alt='image' />
        ))}
      </VStack>
    </>
  )
}

export default TestPage