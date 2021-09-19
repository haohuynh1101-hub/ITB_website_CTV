import { AppLayout } from 'components/layout/AppLayout';
import { menusCTV } from 'constants/menus-ctv';

import { DashboardContainer } from '@/containers';
import { withAuthentication } from '@/hoc/withAuthentication';
const DashboardPage = () => {
  return (
    <>
      <AppLayout menus={menusCTV} title="Dashboard" pageKey={'Dashboard'}>
        {/* <ScoreContainer /> */}
        <DashboardContainer />
        {/* <ComingSoon imageSrc="/coming.jpg" /> */}
      </AppLayout>
    </>
  );
};
export default withAuthentication(DashboardPage, './dashboard');
