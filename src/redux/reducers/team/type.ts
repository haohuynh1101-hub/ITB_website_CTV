export interface ICandidate {
  _id: string;
  email: string;
  password?: string;
  fullName: string;
  birthday: string;
  province: string;
  phone: string;
  mssv: string;
  department: string[];
  address: string;
  role: string;
  gender: 'Nam' | 'Nữ';
  avatar?: string;
  ability: string[];
  linkFB?: string;
  major: string;
}

export interface ITeam {
  _id: string;
  teamName: string;
  leader: ICandidate;
  memberCount: number;
  members: ICandidate[];
  supporters: ICandidate[];
}
