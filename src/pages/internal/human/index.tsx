/* eslint-disable prettier/prettier */
import { AppLayout } from '@/components';
import { menusInternal } from '@/constants/menus-internal';
import { ManageHumanContainer } from "@/containers"
import { withAuthentication } from '@/hoc/withAuthentication';
function ManageHumanPage() {

    return (
        <AppLayout menus={menusInternal}
            pageKey="Human"
            title="Human"
            titleApp="Quản lý nội bộ"

        >
            <ManageHumanContainer />
        </AppLayout>
    );
}

export default withAuthentication(ManageHumanPage, './human');
