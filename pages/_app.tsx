import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { SearchProvider } from "../context/search";
import { ReactElement, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../components/appBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Footer from '../components/footer'
import Head from 'next/head'
import { BASE_URL, theme } from '../constants'

// import dynamic from 'next/dynamic'
import { NextPage } from 'next';
import { supabase } from '../lib/supabaseClient';
import { UserProvider } from '../context/userData';
import AlertComponent from '../components/alerts';
import { MessagesProvider } from '../context/messages';

// const AndroidBar = dynamic(() => import('../components/androidBar'), {
//   ssr: false,
// })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<P = any> = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<{
  initialSession: Session,
}>) {

  const router = useRouter()

  const canonicalUrl = (BASE_URL + (router.asPath === "/" ? "" : router.asPath)).split("?")[0];
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>Honestore: La comunidad de activistas del consumo ético</title>
        <meta name="description" content="Honestore es una comunidad de personas que queremos consumir de forma más responsable.
  Formamos una red de usuarios y tiendas con un foco en la sostenibilidad, cuidado por el medio ambiente, derechos de los trabajadores e impacto social.
  Como usuario, en la app puedes encontrar tiendas que te gustan y venden productos que encajan con tus valores cerca de ti.
  Guarda tus tiendas favoritas para tenerlas siempre a mano y compártelas con tu familia y amigos." />
        <link rel="icon" href="/favicon.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Honestore" />
        <meta property="og:title" content="Honestore: La comunidad de activistas del consumo ético" />
        <meta property="og:description" content="Honestore es una comunidad de personas que queremos consumir de forma más responsable.
  Formamos una red de usuarios y tiendas con un foco en la sostenibilidad, cuidado por el medio ambiente, derechos de los trabajadores e impacto social.
  Como usuario, en la app puedes encontrar tiendas que te gustan y venden productos que encajan con tus valores cerca de ti.
  Guarda tus tiendas favoritas para tenerlas siempre a mano y compártelas con tu familia y amigos." />
        <meta property="og:image" content="https://honestore.app/images/logo2000.jpg" />
        <meta property="og:url" content={canonicalUrl} />
        <link href={canonicalUrl} rel="canonical" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <Box sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}>
          {/* <AndroidBar />
          <MessagesProvider>
            <SearchProvider>
              <UserProvider>
                <ResponsiveAppBar />
                <Container maxWidth="lg" sx={{ flex: 1 }}> */}
                  {getLayout(<Component {...pageProps} />)}
                {/* </Container>
              </UserProvider>
            </SearchProvider>
            <AlertComponent />
          </MessagesProvider>
          <Footer /> */}
        </Box>
      </ThemeProvider>
      <Analytics />
    </SessionContextProvider >
  )
}
export default MyApp
