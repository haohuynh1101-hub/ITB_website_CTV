/* eslint-disable prettier/prettier */
import axios from 'axios';

import { apiRequest, url } from '../api-config';
import * as Types from './type';

export const getCandidates = async () => {
  const getCandidateRequest: apiRequest = {
    url: `${url}/users`,
    method: 'GET',
    baseUrl: url,
  };
  const response = await axios.request(getCandidateRequest);
  return response.data;
};

export const createCandidate = async (body: Types.RequestCandidateBody) => {
  const createCandidateRequest: apiRequest = {
    url: `${url}/users/candidate`,
    method: 'POST',
    baseUrl: url,
    data: body,
  };
  const response = await axios.request(createCandidateRequest);
  return response.data;
};

export const updateCandidate = async (
  candidateId: string,
  body: Types.RequestCandidateBody
) => {
  const createCandidateRequest: apiRequest = {
    url: `${url}/users/${candidateId}`,
    method: 'PATCH',
    baseUrl: url,
    data: body,
  };
  const response = await axios.request(createCandidateRequest);
  return response.data;
};
