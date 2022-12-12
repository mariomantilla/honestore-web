import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Open_Sans } from '@next/font/google'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../components/appBar'
import Container from '@mui/material/Container'
import Footer from '../components/footer'
import Head from 'next/head'

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
  },
  palette: {
    primary: {
      main: "#FB7168"
    }
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

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>Honestore: La comunidad de activistas del consumo ético</title>
        <meta name="description" content="Honestore es una comunidad de personas que queremos consumir de forma más responsable.
  Formamos una red de usuarios y tiendas con un foco en la sostenibilidad, cuidado por el medio ambiente, derechos de los trabajadores e impacto social.
  Como usuario, en la app puedes encontrar tiendas que te gustan y venden productos que encajan con tus valores cerca de ti.
  Guarda tus tiendas favoritas para tenerlas siempre a mano y compártelas con tu familia y amigos." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
      <ResponsiveAppBar active={router.pathname} />
      <Container maxWidth="lg">
        <Component {...pageProps} />
      </Container>
      <Footer />
      </ThemeProvider>
      <Analytics />
    </SessionContextProvider>
  )
}
export default MyApp
