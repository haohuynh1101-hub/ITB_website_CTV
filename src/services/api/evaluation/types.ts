interface IUser {
  _id: string;
  avatar: string;
  fullName: string;
}

export interface IEvaluation {
  candidateId?: string;
  teamId?: string;
  user: IUser;
  icon: string;
  content: string;
  round: string;
}

export type RequestEvaluationBody = {
  candidateId?: string;
  teamId?: string;
  userId: string;
  icon: string;
  content: string;
  round: string;
};

export type RequestGetEvaluationResult = {
  candidateId?: string;
  teamId?: string;
  round?: string;
};
