import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { NewKahootProvider } from '@/Context/NewKahootContext'
import {UserProvider} from '@/Context/UserContext'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider>
          <NewKahootProvider>
            <Component {...pageProps} />
          </NewKahootProvider>
      </UserProvider>
    </ChakraProvider>
  )
}
