import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Open_Sans } from '@next/font/google'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { SearchProvider } from "../context/search";
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../components/appBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Footer from '../components/footer'
import Head from 'next/head'
import { BASE_URL } from '../constants'

import dynamic from 'next/dynamic'

const AndroidBar = dynamic(() => import('../components/androidBar'), {
  ssr: false,
})

const openSans = Open_Sans({ subsets: ['latin'] })


const theme = createTheme({
  typography: {
    fontFamily: [
      openSans.style.fontFamily,
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: 48,
      textAlign: "center",
      marginBottom: "0.7em"
    },
    h2: {
      fontSize: 32,
      textAlign: "center",
      marginBottom: "1em",
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 500,
    },
    subtitle1: {
      color: "#444",
      fontWeight: 400,
      lineHeight: 1.7
    }
  },
  palette: {
    primary: {
      main: "#FB7168",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#521E1E",
      // contrastText: "#FFFFFF"
    },
  }
});


function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()

  const canonicalUrl = (BASE_URL + (router.asPath === "/" ? "" : router.asPath)).split("?")[0];

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
          <AndroidBar />
          <SearchProvider>
            <ResponsiveAppBar />
            <Container maxWidth="lg" sx={{ flex: 1 }}>
              <Component {...pageProps} />
            </Container>
          </SearchProvider>
          <Footer />
        </Box>
      </ThemeProvider>
      <Analytics />
    </SessionContextProvider >
  )
}
export default MyApp
