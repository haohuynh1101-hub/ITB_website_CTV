type TProvince = {
  id: string;
  position: string;
};

export type RequestCandidateBody = {
  email: string;
  password?: string;
  fullName: string;
  birthday: string;
  province?: string;
  phone: string;
  mssv: string;
  department: string[];
  address: string;
  role: string;
  gender: string;
  avatar?: string;
  ability?: string[];
  linkFB?: string;
};
