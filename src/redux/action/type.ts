export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_FAIL = 'USER_GET_FAIL';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const LOGIN = 'LOGIN';

type tokenModel = {
  token: {
    value: string;
  };
};

export type authModel = {
  auth: tokenModel;
};
export interface handleLogin {
  type: typeof LOGIN;
  payload: any;
}

export type AuthDispatchTypes = handleLogin;
