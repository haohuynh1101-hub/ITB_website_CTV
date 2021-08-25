import { Dispatch } from 'redux';
import { Api } from 'services/apis';
import { DEFAULT_API_CONFIG } from 'services/apis/api-config';

import { AuthDispatchTypes, LOGIN } from '.';

const api = new Api(DEFAULT_API_CONFIG, '');
export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
      const result = await api.apiAuth.login(email, password);
      dispatch({
        type: LOGIN,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
