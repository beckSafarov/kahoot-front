import Image from 'next/image'
import React from 'react'

const FullNextImage = ({src, alt, height}:{src:string, alt:string, height?:number}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={height || 0}
      sizes='100vw'
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default FullNextImage