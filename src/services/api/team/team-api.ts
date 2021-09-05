import axios from 'axios';

import { apiRequest, getHeader, url } from '../api-config';
import * as Types from './type';

export const getTeams = async () => {
  const getTeamsRequest: apiRequest = {
    url: `${url}/teams`,
    method: 'GET',
    baseUrl: url,
    headers: getHeader(),
  };
  const response = await axios.request(getTeamsRequest);
  return response.data;
};

export const getTeamDetail = async (teamId: string) => {
  const getTeamDetailRequest: apiRequest = {
    url: `${url}/teams/${teamId}`,
    method: 'GET',
    baseUrl: url,
    headers: getHeader(),
  };
  const response = await axios.request(getTeamDetailRequest);
  return response.data;
};

export const createTeam = async (body: Types.RequestTeamBody) => {
  const createTeamRequest: apiRequest = {
    url: `${url}/teams`,
    method: 'POST',
    baseUrl: url,
    data: body,
    headers: getHeader(),
  };
  const response = await axios.request(createTeamRequest);
  return response.data;
};

export const updateTeam = async (
  teamId: string,
  body: Types.RequestTeamBody
) => {
  const updateTeamRequest: apiRequest = {
    url: `${url}/teams/${teamId}`,
    method: 'PATCH',
    baseUrl: url,
    data: body,
    headers: getHeader(),
  };
  const response = await axios.request(updateTeamRequest);
  return response.data;
};
