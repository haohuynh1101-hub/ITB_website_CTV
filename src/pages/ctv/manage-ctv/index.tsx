import { AppLayout } from 'components/layout/AppLayout';
import { menusCTV } from 'constants/menus-ctv';
import { ManageCTVContainer } from 'containers';

import { withAuthentication } from '@/hoc/withAuthentication';
const ManageCTVPage = () => {
  return (
    <>
      <AppLayout menus={menusCTV} title="Manage | CTV" pageKey={'ManageCTV'}>
        <ManageCTVContainer />
      </AppLayout>
    </>
  );
};
export default withAuthentication(ManageCTVPage, './manage-ctv');
