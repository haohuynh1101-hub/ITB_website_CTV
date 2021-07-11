import { EvaluateContainer } from '@containers';
import { AppLayout } from '@components/layout';
import { menusCTV } from '@constants';

const EvaluatePage = () => {
  return (
    <AppLayout menus={menusCTV} title="Evaluate" pageKey={'Evaluate'}>
      <EvaluateContainer />
    </AppLayout>
  );
};
export default EvaluatePage;
