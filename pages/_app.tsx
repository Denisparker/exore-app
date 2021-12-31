import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { storeWrapper } from 'store'
import { ChakraProvider } from '@chakra-ui/react'
import Page from 'components/Page'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ChakraProvider>
  )
}

export default storeWrapper.withRedux(MyApp)
