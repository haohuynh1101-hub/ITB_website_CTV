import { GeneralApiProblem } from '../api-problem';

export type RequestLoginResult =
  | {
      kind: `ok`;
      result: {
        token: string;
      };
    }
  | GeneralApiProblem;
