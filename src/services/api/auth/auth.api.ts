import axios from 'axios';

import { apiRequest, getHeader, url } from '../api-config';

export const login = async (email: string, password: string) => {
  const loginRequest: apiRequest = {
    url: `${url}/api/Token`,
    method: 'GET',
    baseUrl: url,
    data: { email, password },
    headers: getHeader(),
  };
  const response = await axios.request(loginRequest);
  return response.data;
};
