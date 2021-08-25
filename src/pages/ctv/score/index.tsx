import { AppLayout } from 'components/layout/AppLayout';
import { menusCTV } from 'constants/menus-ctv';
import { ScoreContainer } from 'containers/score';
const ScoreCTVPage = () => {
  return (
    <>
      <AppLayout menus={menusCTV} title="Home" pageKey={'Score'}>
        <ScoreContainer />
      </AppLayout>
    </>
  );
};
export default ScoreCTVPage;
