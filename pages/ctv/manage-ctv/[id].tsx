import { AppLayout } from '@components/layout/AppLayout';
import { menusCTV } from '@constants';
import { EvaluatePersonalContainer } from '@containers';
const EvaluatePersonal = () => {
  return (
    <>
      <AppLayout
        menus={menusCTV}
        title="Evaluate-Personal"
        pageKey={'ManageCTV'}
      >
        <EvaluatePersonalContainer />
      </AppLayout>
    </>
  );
};
export default EvaluatePersonal;
