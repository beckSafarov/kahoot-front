import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { NewKahootProvider } from '@/Context/NewKahootContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NewKahootProvider>
        <Component {...pageProps} />
      </NewKahootProvider>
    </ChakraProvider>
  )
}
