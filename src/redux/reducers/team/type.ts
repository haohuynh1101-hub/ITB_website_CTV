import { ICandidate } from '../candidate/type';

export interface ITeam {
  _id: string;
  teamName: string;
  leader: ICandidate;
  memberCount: number;
  members: ICandidate[];
  supporters: ICandidate[];
}
