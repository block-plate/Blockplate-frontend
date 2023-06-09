import type { AppProps } from 'next/app'
import 'semantic-ui-css/semantic.min.css';
import "react-toastify/dist/ReactToastify.css";
import {styledTheme} from "@/styles/theme";
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {ToastContainer} from 'react-toastify';
import { ReactElement, ReactNode } from 'react';
import {NextPage} from "next";
import '@/styles/global.css'
import {wrapper} from "features";
import {Provider} from "react-redux";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode,
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
    const {store, props} = wrapper.useWrappedStore(rest);
    const getLayout = Component.getLayout ?? ((page) => page)

  return(
      <>
        <StyledThemeProvider theme={styledTheme}>
            <Provider store={store}>
                {getLayout(<Component {...props.pageProps} />)}
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                ></ToastContainer>
            </Provider>
        </StyledThemeProvider>
      </>
  )
}
