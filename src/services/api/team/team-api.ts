/* eslint-disable prettier/prettier */
import axios from 'axios';

import { apiRequest, url } from '../api-config';
import * as Types from './type';

export const getTeams = async () => {
  const getTeamsRequest: apiRequest = {
    url: `${url}/teams`,
    method: 'GET',
    baseUrl: url,
  };
  const response = await axios.request(getTeamsRequest);
  return response.data;
};

export const createTeam = async (body: Types.RequestTeamBody) => {
  const createTeamRequest: apiRequest = {
    url: `${url}/teams`,
    method: 'POST',
    baseUrl: url,
    data: body,
  };
  const response = await axios.request(createTeamRequest);
  return response.data;
};

export const updateTeam = async (
  teamId: string,
  body: Types.RequestTeamBody
) => {
  const createTeamRequest: apiRequest = {
    url: `${url}/teams/${teamId}`,
    method: 'PATCH',
    baseUrl: url,
    data: body,
  };
  const response = await axios.request(createTeamRequest);
  return response.data;
};
