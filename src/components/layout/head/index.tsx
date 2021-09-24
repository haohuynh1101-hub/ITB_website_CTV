/* eslint-disable prettier/prettier */

import NextHead from 'next/head';

import { APP_NAME } from '@/constants';
type IProps = {
  pageTitle?: string;
};
export const Head: React.FC<IProps> = ({ pageTitle }) => {
  const title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;
  const description = 'Software with Powerful';

  return (
    <NextHead>
      <title>{title}</title>
      {/* <meta name="theme-color" content="#f37f26" /> */}
      <meta name="description" content={description} />
      <meta name="author" content="haohao" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter Card */}
      <meta name="twitter :card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@haohao" />
    </NextHead>
  );
};
