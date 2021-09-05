import axios from 'axios';

import { apiRequest, url } from '../api-config';

export const DriveApi = {
  async upload() {
    const uploadRequest: apiRequest = {
      url: `${url}/test-upload`,
      method: 'POST',
      baseUrl: url,
    };
    const response = await axios.request(uploadRequest);
    return response.data;
  },
};
