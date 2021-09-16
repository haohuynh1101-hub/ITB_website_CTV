import { AppLayout } from 'components/layout/AppLayout';
import { menusCTV } from 'constants/menus-ctv';

import ComingSoon from '@/components/coming-soon';
import { withAuthentication } from '@/hoc/withAuthentication';
const ScoreCTVPage = () => {
  return (
    <>
      <AppLayout menus={menusCTV} title="Home" pageKey={'Score'}>
        {/* <ScoreContainer /> */}
        <ComingSoon imageSrc="/coming.jpg" />
      </AppLayout>
    </>
  );
};
export default withAuthentication(ScoreCTVPage, './score');
