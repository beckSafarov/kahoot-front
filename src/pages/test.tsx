import { VStack } from '@chakra-ui/react'
import {useState} from 'react'
import axios from 'axios'
import Image from 'next/image'
const TestPage = () => {
  const [images, setImages] = useState([])
  const handleSearch = async() => {
    const {data} = await axios.get(
      `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_KEY}&q=yellow+flowers&image_type=photo`
    )
    console.log(data)
    const receivedImages = data.hits.map(
      (res: {largeImgUrl:string}) => res.largeImgUrl
      )
    console.log(receivedImages)
    setImages(receivedImages)
  }
  console.log(images)
  return (
    <>
      <button onClick={handleSearch}>Search</button>
      <VStack>
        {images.map((image:string, i:number)=>(
          <Image src={image} height={100} width={100} alt='image'/>
        ))}
      </VStack>
    </>
  )
}

export default TestPage