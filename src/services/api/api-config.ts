import { Method } from 'axios';

export interface apiRequest {
  url: string;
  method: Method;
  data?: any;
  baseUrl?: string;
  headers?: any;
}
export const url = 'http://localhost:4002';
export const getHeader = () => {
  const accessToken: string = localStorage.getItem('ACCESS_TOKEN') || '';

  return { Authorization: `Bearer ${accessToken}` };
};
