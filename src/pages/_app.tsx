import type { AppProps } from "next/app";
import React, { useState } from "react";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import theme from "../lib/mui/theme";
import createEmotionCache from "../lib/mui/createEmotionCache";
import Header from "../components/landing/header/Header";
import LensUserContextProvider from "../context/LensUserContext";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import GlobalInformationModalContextProvider, {
  ModalState,
} from "../context/GlobalInformationModalContext";
import ModalOverlay from "../components/modal/ModalOverlay";
import { ThemeProvider, CssBaseline, Snackbar } from "@mui/material";
import SnackbarContextProvider, {
  SnackbarState,
} from "../context/SnackbarContext";
import SnackbarComponent from "../components/snackbar/Snackbar";

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
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [snackbarState, setSnackbarState] = useState<SnackbarState | null>(
    null
  );

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

              <GlobalInformationModalContextProvider
                modalState={modalState}
                setModalState={setModalState}
              >
                <SnackbarContextProvider
                  snackbarState={snackbarState}
                  setSnackbarState={setSnackbarState}
                >
                  <NextNProgress color={theme.palette.primary.main} />
                  {/* TODO: Temp hack to not show header on /create page */}
                  {router.pathname !== "/create" && <Header />}
                  {router.pathname !== "/" && <div style={{ height: 96 }} />}
                  {/* If modalState, show ModalOverlay */}
                  {modalState?.type !== null && <ModalOverlay />}
                  {snackbarState?.open && <SnackbarComponent />}
                  <Component {...pageProps} />
                </SnackbarContextProvider>
              </GlobalInformationModalContextProvider>
            </ThemeProvider>
          </LensUserContextProvider>
        </QueryClientProvider>
      </ThirdwebProvider>
    </CacheProvider>
  );
}
