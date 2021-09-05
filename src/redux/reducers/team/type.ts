export interface ICandidate {
  _id: string;
  email: string;
  fullName: string;
  department: string[];
  address: string;
  gender: 'Nam' | 'Nữ';
  avatar?: string;
}

export interface ITeam {
  _id: string;
  teamName: string;
  leader: ICandidate;
  memberCount: number;
  members: ICandidate[];
  supporters: ICandidate[];
}
