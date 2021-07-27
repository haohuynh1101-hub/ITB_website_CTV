import { AppLayout } from '@components/layout/AppLayout';
import { menusCTV } from '@constants';
import { ScoreContainer } from '@containers/score';
const ScoreCTVPage = () => {
  return (
    <>
      <AppLayout menus={menusCTV} title="Home" pageKey={'ManageCTV'}>
        <ScoreContainer />
      </AppLayout>
    </>
  );
};
export default ScoreCTVPage;
