export const TABLE_COL_WIDTH = {
  team: 0,
  avatar: 64,
  fullName: 312,
  class: 80,
  score: 80,
  total: 48,
};

type scores = {
  _id: string;
  value: number;
};
export type personalModal = {
  id: string;
  fullName: string;
  class: string;
  scores: scores[];
};
export const personalScores: personalModal[] = [
  {
    id: '1',
    fullName: 'Huynh Nhat Hao',
    class: 'k19411C',
    scores: [
      {
        _id: '1',
        value: 95,
      },
      {
        _id: '2',
        value: 90,
      },
      {
        _id: '3',
        value: 85,
      },
    ],
  },
  {
    id: '2',
    fullName: 'Vu Quang Huy',
    class: 'k18411C',
    scores: [
      {
        _id: '1',
        value: 95,
      },
      {
        _id: '2',
        value: 90,
      },
      {
        _id: '3',
        value: 85,
      },
      {
        _id: '3',
        value: 85,
      },
    ],
  },
  {
    id: '3',
    fullName: 'Ngo Van Khai',
    class: 'k20411C',
    scores: [
      {
        _id: '1',
        value: 95,
      },
      {
        _id: '2',
        value: 90,
      },
      {
        _id: '3',
        value: 85,
      },
    ],
  },
];
