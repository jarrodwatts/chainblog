import type { AppProps } from "next/app";
import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import theme from "../lib/mui/theme";
import createEmotionCache from "../lib/mui/createEmotionCache";
import Header from "../components/landing/header/Header";
import LensUserContextProvider from "../context/LensUserContext";
import { useRouter } from "next/router";
import HeaderGap from "../components/landing/header/HeaderGap";

// thirwdeb setup
const desiredChainId = ChainId.Polygon;

// react query setup
const queryClient = new QueryClient();

// Material UI setup
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <ThirdwebProvider desiredChainId={desiredChainId}>
        <QueryClientProvider client={queryClient}>
          <LensUserContextProvider>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Header />
              {router.pathname !== "/" && <div style={{ height: 96 }} />}
              <Component {...pageProps} />
            </ThemeProvider>
          </LensUserContextProvider>
        </QueryClientProvider>
      </ThirdwebProvider>
    </CacheProvider>
  );
}
