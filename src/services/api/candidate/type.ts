export type RequestCandidateBody = {
  email: string;
  password?: string;
  fullName: string;
  birthday: string;
  province?: string;
  phone: string;
  studentId: string;
  department: string[];
  address: string;
  role: string;
  gender: string;
  avatar?: string;
  ability?: string[];
  linkFB?: string;
};

export type RequestGetUsersResult = {
  role?: string;
};
