import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { SearchProvider } from "../context/search";
import { ReactElement, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../components/appBar'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Footer from '../components/footer'
import Head from 'next/head'
import { BASE_URL, imageKitAuthenticationEndpoint, theme } from '../constants'

import dynamic from 'next/dynamic'
import { NextPage } from 'next';
import { supabase } from '../lib/supabaseClient';
import { UserProvider } from '../context/userData';
import AlertComponent from '../components/alerts';
import { MessagesProvider } from '../context/messages';
import { IKContext } from 'imagekitio-react';
import mixpanel from 'mixpanel-browser';
import CookieBanner from '../components/cookieBanner';
import Feedback from '../components/feedback';
import { GlobalConfigProvider } from '../context/globalConfig';
import ErrorBoundary from '../components/ErrorBounday';
import WebAnalytics from '../lib/analytics';
import ErrorTracker from '../lib/errorTracking';

require("regenerator-runtime/runtime");

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

  const authenticator = async () => {
		const response = await fetch(imageKitAuthenticationEndpoint);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Request failed with status ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		const { signature, expire, token } = data;
		return { signature, expire, token };
  };

  mixpanel.init('09a8489cc7aa57b32a5a31d6e0740db8', {
    debug: false,
    track_pageview: true,
    persistence: 'localStorage',
    opt_out_tracking_by_default: true,
    opt_out_persistence_by_default: true
  });

  const analytics = new WebAnalytics({
    host: "https://api.tinybird.co",
    token: process.env.NEXT_PUBLIC_ANALYTICS_TOKEN
  });

  const errorTracker = new ErrorTracker({
    host: "https://api.tinybird.co",
    token: process.env.NEXT_PUBLIC_ERROR_TRACKING_TOKEN
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
    analytics.trackPageHit();
    errorTracker.addHandlers()
    return () => authListener.subscription.unsubscribe(); // Cleanup the listener when component unmounts
  }, [analytics, errorTracker]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
        analytics.trackPageHit();
        //Send track event when new pages is loaded
        mixpanel.track_pageview();
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, analytics])

  return (
    <ErrorBoundary tracker={errorTracker}>
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>Honestore: Tiendas sostenibles y de consumo responsable cerca de ti</title>
        <meta name="description" content="Descubre Honestore, la plataforma que conecta consumidores responsables con comercios sostenibles en España.
  Encuentra y filtra comercios que se alinean con tus valores de sostenibilidad: reducción de residuos, comercio justo, circularidad, energías renovables y más.
  Información detallada, mapas y experiencias de usuario optimizada. Conviértete en parte de nuestra comunidad consciente, transformando la manera en que
  compras y apoyando a comercios locales comprometidos con la sostenibilidad." />
        <link rel="icon" href="/favicon.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Honestore" />
        <meta key="meta-og-title" property="og:title" content="Honestore: Tiendas sostenibles y de consumo responsable cerca de ti" />
        <meta  key="meta-og-desc" property="og:description" content="Descubre Honestore, la plataforma que conecta consumidores responsables con comercios sostenibles en España.
  Encuentra y filtra comercios que se alinean con tus valores de sostenibilidad: reducción de residuos, comercio justo, circularidad, energías renovables y más.
  Información detallada, mapas y experiencias de usuario optimizada. Conviértete en parte de nuestra comunidad consciente, transformando la manera en que
  compras y apoyando a comercios locales comprometidos con la sostenibilidad." />
        <meta property="og:image" content="https://honestore.app/images/logo2000.jpg" key="head-image" />
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
                <IKContext
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY} // optional
					  authenticator={authenticator}
                >
                  <ResponsiveAppBar />
                  <Container maxWidth="lg" sx={{ flex: 1 }}>
                    {getLayout(<Component {...pageProps} />)}
                  </Container>
                  <Feedback />
                </IKContext>
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
    </SessionContextProvider>
    </ErrorBoundary>
  )
}
export default MyApp
