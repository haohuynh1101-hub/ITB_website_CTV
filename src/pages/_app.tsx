import 'styles/globals.css';
import 'styles/tailwind.css';
import 'rc-drawer/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'emoji-mart/css/emoji-mart.css';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/scrollbar.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from 'redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My new cool app</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Provider store={store}>
        <NextNprogress
          color="#f37f26"
          height={3}
          options={{
            showSpinner: false,
          }}
        />

        <Component {...pageProps} />

        <ToastContainer position="bottom-right" />
      </Provider>
    </>
  );
}

export default MyApp;
