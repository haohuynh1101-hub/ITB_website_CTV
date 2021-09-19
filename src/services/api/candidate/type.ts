export type RequestCandidateBody = {
  email?: string;
  password?: string;
  fullName?: string;
  birthday?: string;
  province?: string;
  phone?: string;
  studentId?: string;
  department?: string[];
  address?: string;
  role?: string;
  gender?: string;
  avatar?: string;
  ability?: string[];
  linkFB?: string;
  isArchived?: boolean;
  scoreAvg_1?: string;
  scoreAvg_2?: string;
};

export type RequestGetUsersResult = {
  role?: string;
};

export type RequestParamsUser = {
  isArchived?: boolean;
  role?: string;
};
