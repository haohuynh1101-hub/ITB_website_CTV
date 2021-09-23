/* eslint-disable prettier/prettier */
import axios from 'axios';

import { apiRequest, getHeader, url } from '../api-config';
import * as Types from './type';

export const UsersApi = {
  async getUsers(params?: Types.RequestParamsUser) {
    const getUsersRequest: apiRequest = {
      url: `${url}/users`,
      method: 'GET',
      baseUrl: url,
      params: { isArchived: params.isArchived, role: params.role },
      headers: getHeader(),
    };
    const response = await axios.request(getUsersRequest);
    return response.data;
  },

  async getUserDetail(id: string) {
    const getUserDetailRequest: apiRequest = {
      url: `${url}/users/${id}`,
      method: 'GET',
      baseUrl: url,
      headers: getHeader(),
    };
    const response = await axios.request(getUserDetailRequest);
    return response.data;
  },

  async createCandidate(body: Types.RequestCandidateBody) {
    const createCandidateRequest: apiRequest = {
      url: `${url}/users/candidate`,
      method: 'POST',
      baseUrl: url,
      data: body,
      headers: getHeader(),
    };
    const response = await axios.request(createCandidateRequest);
    return response.data;
  },

  async updateUser(id: string, body: Types.RequestCandidateBody) {
    const updateUserRequest: apiRequest = {
      url: `${url}/users/${id}`,
      method: 'PATCH',
      baseUrl: url,
      data: body,
      headers: getHeader(),
    };

    const response = await axios.request(updateUserRequest);
    return response.data;
  },
};
