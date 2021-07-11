import { Drawer, FormItem, Button } from '@components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
type IProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
};
export const DrawerCTV: React.FC<IProps> = ({ visible, onClose, title }) => {
  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title={title}
      placement="right"
      footer={
        <>
          <Button title="Thêm" onClick={() => console.log('')} />
        </>
      }
    >
      <form></form>
    </Drawer>
  );
};
