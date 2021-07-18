import '../styles/globals.css';
import '../styles/tailwind.css';
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'emoji-mart/css/emoji-mart.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My new cool app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
