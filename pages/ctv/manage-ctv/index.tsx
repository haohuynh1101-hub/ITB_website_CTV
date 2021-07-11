import { AppLayout } from '@components/layout/AppLayout';
import { menusCTV } from '@constants';
import { ManageCTVContainer } from '@containers';
const ManageCTVPage = () => {
  return (
    <>
      <AppLayout menus={menusCTV} title="Home" pageKey={'ManageCTV'}>
        <ManageCTVContainer />
      </AppLayout>
    </>
  );
};
export default ManageCTVPage;
