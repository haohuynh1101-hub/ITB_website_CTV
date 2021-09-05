import { AppLayout } from 'components/layout/AppLayout';
import { menusCTV } from 'constants/menus-ctv';

import { EvaluatePersonalContainer } from '@/containers/evaluate-personal';
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
