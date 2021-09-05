import axios from 'axios';

import { apiRequest, getHeader, url } from '../api-config';

export const AuthApi = {
  async login(email: string, password: string) {
    const loginRequest: apiRequest = {
      url: `${url}/auth/login`,
      method: 'POST',
      baseUrl: url,
      data: { email, password },
    };
    const response = await axios.request(loginRequest);
    return response.data;
  },

  async getMe() {
    const getMeRequest: apiRequest = {
      url: `${url}/auth/me`,
      method: 'GET',
      baseUrl: url,
      headers: getHeader(),
    };
    const response = await axios.request(getMeRequest);
    return response.data;
  },
};
