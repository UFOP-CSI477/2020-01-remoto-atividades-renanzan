import storeWrapper from 'store';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core';

import theme from 'theme/default';
import 'theme/global.css';

import AuthMiddleware from 'middleware/AuthMiddleware';
import { ModalAuthentication } from 'components/___organisms';

function MyApp({ Component, pageProps }) {
    const sheets = new ServerStyleSheets();

    return sheets.collect(
        <ThemeProvider theme={theme}>
            <AuthMiddleware />

            <Component {...pageProps} />
        
            <ModalAuthentication />
        </ThemeProvider>
    );
}

export default storeWrapper.withRedux(MyApp);
