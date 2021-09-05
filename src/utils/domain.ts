import { NextPageContext } from 'next';
import Router from 'next/router';

import { ROUTES_NO_AUTH } from '@/constants';

export function utilRedirectLocation(location: string, ctx?: NextPageContext) {
  if (typeof window === 'undefined') {
    ctx?.res?.writeHead(302, {
      location,
    });
    ctx?.res?.end();
  } else {
    Router.replace(location);
  }
}

export function utilRedirectAuth(isAuth: boolean, ctx?: NextPageContext) {
  const url = ctx?.pathname;
  const routeNoAuth = ROUTES_NO_AUTH.includes(url);
  if (!isAuth) {
    if (!routeNoAuth) {
      utilRedirectLocation(ROUTES_NO_AUTH[0], ctx);
    }
  } else {
    if (routeNoAuth) {
      utilRedirectLocation('/', ctx);
    }
  }
}
