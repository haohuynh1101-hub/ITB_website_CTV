import { AppLayout } from 'components/layout';
import { menusCTV } from 'constants/menus-ctv';

import { TeamEvaluationContainer } from '@/containers/team';

const TeamPage = () => {
    return (
        <AppLayout menus={menusCTV} title="Evaluation-Team" pageKey={'Team'}>
            <TeamEvaluationContainer />
        </AppLayout>
    );
};
export default TeamPage;
