import { AppLayout } from 'components/layout';
import { menusCTV } from 'constants/menus-ctv';
import { TeamContainer } from 'containers';

const TeamPage = () => {
  return (
    <AppLayout menus={menusCTV} title="Team" pageKey={'Team'}>
      <TeamContainer />
    </AppLayout>
  );
};
export default TeamPage;
