import { useMemo } from 'react';

import { TableHead } from './components';
import { TableRow } from './components/table-row';
import { personalScores, TABLE_COL_WIDTH as COL_WIDTH } from './constant';
export const ScoreContainer = () => {
  const tableWidth = useMemo(() => {
    return (
      COL_WIDTH.team +
      COL_WIDTH.avatar +
      COL_WIDTH.fullName +
      COL_WIDTH.fullName +
      COL_WIDTH.class +
      COL_WIDTH.score * 3 +
      COL_WIDTH.total
    );
  }, []);

  return (
    <div className="overflow-auto border rounded-md">
      <table
        className="min-w-full overflow-scroll border-collapse table-fixed table-scorecard animate__animated animate__fadeIn "
        style={{ width: tableWidth }}
      >
        <TableHead />

        <tbody>
          {personalScores.length
            ? personalScores.map((personalScore, index) => (
                <TableRow key={index} personal={personalScore} />
              ))
            : ''}
        </tbody>
      </table>
    </div>
  );
};
