interface IUser {
  _id: string;
  avatar: string;
  fullName: string;
}

export interface IEvaluation {
  _id?: string;
  candidateId?: string;
  teamId?: string;
  user: IUser;
  icon: string;
  content: string;
  round: string;
  createdAt?: string;
}
