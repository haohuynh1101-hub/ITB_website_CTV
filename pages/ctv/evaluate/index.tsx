import { AppLayout } from '@components/layout';
import { menusCTV } from '@constants';
import { EvaluateContainer } from '@containers';

const EvaluatePage = () => {
  return (
    <AppLayout menus={menusCTV} title="Evaluate" pageKey={'Evaluate'}>
      <EvaluateContainer />
    </AppLayout>
  );
};
export default EvaluatePage;
