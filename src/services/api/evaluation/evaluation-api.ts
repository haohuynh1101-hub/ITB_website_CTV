/* eslint-disable prettier/prettier */
import axios from 'axios';

import { apiRequest, getHeader, url } from '../api-config';
import * as Types from './types';

export const EvaluationApi = {
  async getEvaluationCandidate(params: Types.RequestGetEvaluationResult) {
    const getEvaluationCandidateRequest: apiRequest = {
      url: `${url}/evaluation`,
      method: 'GET',
      baseUrl: url,
      params: {
        candidateId: params.candidateId,
        teamId: params.teamId,
        round: params.round,
        page: params.page,
      },
      headers: getHeader(),
    };
    const response = await axios.request(getEvaluationCandidateRequest);
    return response.data;
  },

  async createEvaluation(body: Types.RequestEvaluationBody) {
    const createEvaluationRequest: apiRequest = {
      url: `${url}/evaluation`,
      method: 'POST',
      baseUrl: url,
      data: body,
      headers: getHeader(),
    };
    const response = await axios.request(createEvaluationRequest);
    return response.data;
  },

  async updateEvaluation(
    evaluationId: string,
    body: Types.RequestEvaluationBody
  ) {
    const updateEvaluationRequest: apiRequest = {
      url: `${url}/evaluation/${evaluationId}`,
      method: 'PATCH',
      baseUrl: url,
      data: body,
      headers: getHeader(),
    };
    const response = await axios.request(updateEvaluationRequest);
    return response.data;
  },

  async deleteEvaluation(evaluationId: string) {
    const deleteEvaluationRequest: apiRequest = {
      url: `${url}/evaluation/${evaluationId}`,
      method: 'DELETE',
      baseUrl: url,
      headers: getHeader(),
    };
    const response = await axios.request(deleteEvaluationRequest);
    return response.data;
  },
};
