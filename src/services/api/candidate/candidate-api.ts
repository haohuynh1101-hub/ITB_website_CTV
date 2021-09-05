/* eslint-disable prettier/prettier */
import axios from 'axios';

import { apiRequest, getHeader, url } from '../api-config';
import * as Types from './type';

export const getCandidates = async () => {
  const getCandidatesRequest: apiRequest = {
    url: `${url}/users`,
    method: 'GET',
    baseUrl: url,
    headers: getHeader(),
  };
  const response = await axios.request(getCandidatesRequest);
  return response.data;
};

export const getCandidateDetail = async (userId: string) => {
  const getCandidateDetailRequest: apiRequest = {
    url: `${url}/users/${userId}`,
    method: 'GET',
    baseUrl: url,
    headers: getHeader(),
  };
  const response = await axios.request(getCandidateDetailRequest);
  return response.data;
};

export const createCandidate = async (body: Types.RequestCandidateBody) => {
  const createCandidateRequest: apiRequest = {
    url: `${url}/users/candidate`,
    method: 'POST',
    baseUrl: url,
    data: body,
    headers: getHeader(),
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
    headers: getHeader(),
  };
  const response = await axios.request(createCandidateRequest);
  return response.data;
};
