import router from 'next/router';

import { Button } from '@/components';
import ComingSoon from '@/components/coming-soon';
import { withAuthentication } from '@/hoc/withAuthentication';
function ManageHumanPage() {
  const handleComeBack = () => {
    router.push('/');
  };
  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{ background: '#fafafa' }}
    >
      <div className="flex flex-col items-center justify-center">
        <ComingSoon imageSrc="/coming.jpg" />
        <Button title="Quay lại" onClick={handleComeBack} />
      </div>
    </div>
  );
}

export default withAuthentication(ManageHumanPage, '/manage-human');
