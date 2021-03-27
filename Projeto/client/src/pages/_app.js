import { ServerStyleSheets } from '@material-ui/core';
import storeWrapper from 'store';

function MyApp({ Component, pageProps }) {
    const sheets = new ServerStyleSheets();

    return sheets.collect(
      <Component {...pageProps} />
    );
}

export default storeWrapper.withRedux(MyApp);
