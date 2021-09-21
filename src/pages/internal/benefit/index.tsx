import { AppLayout } from '@/components';
import { menusInternal } from '@/constants/menus-internal';
import { BenefitContainer } from '@/containers';
import { withAuthentication } from '@/hoc/withAuthentication';
function BenefitPage() {
    return (
        <AppLayout
            menus={menusInternal}
            pageKey="Benefit"
            title="Benefit"
            titleApp="Quản lý nội bộ"
        >
            <BenefitContainer />
        </AppLayout>
    );
}
export default withAuthentication(BenefitPage, './benefit');
