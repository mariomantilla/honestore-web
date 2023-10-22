import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { SearchProvider } from "../context/search";
import { ReactElement, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../components/appBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Footer from '../components/footer'
import Head from 'next/head'
import { BASE_URL, imageKitAuthenticationEndpoint, theme } from '../constants'

import dynamic from 'next/dynamic'
import { NextPage } from 'next';
import { supabase, endpoint } from '../lib/supabaseClient';
import { UserProvider } from '../context/userData';
import AlertComponent from '../components/alerts';
import { MessagesProvider } from '../context/messages';
import { IKContext } from 'imagekitio-react';
import mixpanel from 'mixpanel-browser';
import CookieBanner from '../components/cookieBanner';
import Feedback from '../components/feedback';
import { GlobalConfigProvider } from '../context/globalConfig';

const AndroidBar = dynamic(() => import('../components/androidBar'), {
  ssr: false,
})

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

  mixpanel.init('09a8489cc7aa57b32a5a31d6e0740db8', {
    debug: false,
    track_pageview: true,
    persistence: 'localStorage',
    opt_out_tracking_by_default: true,
    opt_out_persistence_by_default: true
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_OUT') {
        mixpanel.reset();
      }
      if (event == 'SIGNED_IN') {
        mixpanel.opt_in_tracking();
        mixpanel.identify(session?.user.id.toString());
      }
    });

    return () => authListener.subscription.unsubscribe(); // Cleanup the listener when component unmounts
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
        //Send track event when new pages is loaded
        mixpanel.track_pageview();
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>Honestore: La comunidad de activistas del consumo ético</title>
        <meta name="description" content="Honestore es una comunidad de personas que queremos consumir de forma más responsable.
  Formamos una red de usuarios y comercios con un foco en la sostenibilidad, cuidado por el medio ambiente, derechos de los trabajadores e impacto social.
  Como usuario, en la app puedes encontrar comercios que te gustan y venden productos que encajan con tus valores cerca de ti.
  Guarda tus comercios favoritas para tenerlas siempre a mano y compártelas con tu familia y amigos." />
        <link rel="icon" href="/favicon.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Honestore" />
        <meta key="meta-og-title" property="og:title" content="Honestore: La comunidad de activistas del consumo ético" />
        <meta  key="meta-og-desc" property="og:description" content="Honestore es una comunidad de personas que queremos consumir de forma más responsable.
  Formamos una red de usuarios y comercios con un foco en la sostenibilidad, cuidado por el medio ambiente, derechos de los trabajadores e impacto social.
  Como usuario, en la app puedes encontrar comercios que te gustan y venden productos que encajan con tus valores cerca de ti.
  Guarda tus comercios favoritos para tenerlas siempre a mano y compártelas con tu familia y amigos." />
        <meta property="og:image" content="https://honestore.app/images/logo2000.jpg" />
        <meta property="og:url" content={canonicalUrl} />
        <link href={canonicalUrl} rel="canonical" key="head-canonical" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <Box sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}>
          <AndroidBar />
          <GlobalConfigProvider>
          <MessagesProvider>
            <SearchProvider>
              <UserProvider>
                <ResponsiveAppBar />
                  <IKContext
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY} // optional
                    authenticationEndpoint={imageKitAuthenticationEndpoint}>
                    <Container maxWidth="lg" sx={{ flex: 1 }}>
                      {getLayout(<Component {...pageProps} />)}
                    </Container>
                  </IKContext>
                <Feedback />
              </UserProvider>
            </SearchProvider>
            <AlertComponent />
          </MessagesProvider>
          </GlobalConfigProvider>
          <Footer />
          <CookieBanner />
        </Box>
      </ThemeProvider>
      <Analytics />
    </SessionContextProvider >
  )
}
export default MyApp
