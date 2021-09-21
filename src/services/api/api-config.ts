import { Method } from 'axios';

import { APP_CONSTANTS } from '@/constants';
export interface apiRequest {
  url: string;
  method: Method;
  data?: any;
  baseUrl?: string;
  headers?: any;
  params?: any;
}
export const url = 'http://103.116.104.148:4002';
// export const url = 'http://localhost:4002';

export const getHeader = () => {
  const accessToken: string = localStorage.getItem(APP_CONSTANTS.AUTH) || '';

  return { Authorization: `Bearer ${accessToken}` };
};
