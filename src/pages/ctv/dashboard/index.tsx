import { AppLayout } from 'components/layout/AppLayout';
import { menusCTV } from 'constants/menus-ctv';

import ComingSoon from '@/components/coming-soon';
import { withAuthentication } from '@/hoc/withAuthentication';
const DashboardPage = () => {
  return (
    <>
      <AppLayout menus={menusCTV} title="Dashboard" pageKey={'Dashboard'}>
        {/* <ScoreContainer /> */}
        <ComingSoon imageSrc="/coming.jpg" />
      </AppLayout>
    </>
  );
};
export default withAuthentication(DashboardPage, './dashboard');
