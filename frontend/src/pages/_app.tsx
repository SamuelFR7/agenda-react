import React from 'react'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../contexts/AuthContext'
import { PeopleProvider } from '../contexts/PeopleContext'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <PeopleProvider>
            <Component {...pageProps} />
          </PeopleProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
