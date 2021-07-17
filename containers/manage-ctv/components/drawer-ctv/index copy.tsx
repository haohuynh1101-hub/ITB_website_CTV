import {
  Button,
  CheckboxGroup,
  DatePicker,
  Drawer,
  FormItem,
  Input,
  SelectControlled,
} from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
const departmentOptions = [
  {
    key: '1',
    value: 'Học thuật',
    isChecked: false,
  },
  {
    key: '2',
    value: 'Truyền thông',
    isChecked: false,
  },
  {
    key: '3',
    value: 'Sự kiện',
    isChecked: false,
  },
  {
    key: '4',
    value: 'Nhân sự',
    isChecked: false,
  },
];
interface IFormValue {
  fullName: string;
  gender: string;
  birthday: Date;
  idStudent: string;
  class: string;
  phoneNumber: string;
  email: string;
  address: string;
  face: string;
  ability: [
    'Lãnh đạo',
    'Tổ chức',
    'Thiết kế',
    'Chụp ảnh',
    'Viết bài',
    'MC',
    'Hát - Nhảy',
    'Vẽ',
    'Làm đồ thủ công',
    'Lập trình'
  ];
  department: string[];
}
type IProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  defaultValues?: IFormValue;
};

const schema = yup.object().shape({
  title: yup.string(),
  ownerId: yup.string(),
});
export const DrawerCTV: React.FC<IProps> = ({
  defaultValues,
  visible,
  onClose,
  title,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormValue>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormValue> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Drawer
        visible={visible}
        onClose={onClose}
        title={title}
        placement="right"
        footer={
          <Button
            title="Thêm"
            type="primary"
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          />
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4">
            <FormItem
              label="Họ và tên"
              isRequired
              error={errors.fullName?.message}
            >
              <Controller
                control={control}
                name="fullName"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Họ và tên"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="Giới tính"
              isRequired
              error={errors.gender?.message}
            >
              <Controller
                control={control}
                name="gender"
                render={({ field: { value, onChange } }) => (
                  <SelectControlled
                    options={[
                      { name: 'Nam', value: '1' },
                      { name: 'Nữ', value: '2' },
                    ]}
                    value={value}
                    onChange={onChange}
                    placeholder="Giới tính"
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="Ngày sinh"
              isRequired
              error={errors.birthday?.message}
            >
              <Controller
                control={control}
                name="birthday"
                defaultValue={new Date()}
                render={({ field: { value, onChange } }) => (
                  <DatePicker value={value} onChange={onChange} />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormItem
              label="Mã số sinh viên"
              isRequired
              error={errors.idStudent?.message}
            >
              <Controller
                control={control}
                name="idStudent"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="MSSV"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>

            <FormItem label="Lớp" isRequired error={errors.class?.message}>
              <Controller
                control={control}
                name="class"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Lớp"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="Số điện thoại"
              isRequired
              error={errors.phoneNumber?.message}
            >
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Số điện thoại"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormItem label="Email" isRequired error={errors.email?.message}>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Email"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>

            <FormItem
              label="Nơi ở hiện tại"
              isRequired
              error={errors.address?.message}
            >
              <Controller
                control={control}
                name="address"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Nơi ở hiện tại"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>
          </div>

          <FormItem label="Facebook cá nhân">
            <Controller
              control={control}
              name="face"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Facebook cá nhân"
                  value={value}
                  onChange={onChange}
                  type="primary"
                />
              )}
            />
          </FormItem>

          <div className="grid grid-cols-4 gap-2">
            <FormItem>
              <Controller
                control={control}
                name="department"
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    value="Hoc thuat"
                    onChange={onChange}
                    title="Hoc Thuat"
                  />
                )}
              />
            </FormItem>
            <FormItem>
              <Controller
                control={control}
                name="department"
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    value="Truyen thong"
                    onChange={onChange}
                    title="Truyen thong"
                  />
                )}
              />
            </FormItem>
            {/* {departmentOptions.map((option) => (
              <FormItem key={option.key}>
                <Controller
                  control={control}
                  name="department"
                  render={({ field: { value, onChange } }) => (
                    <CheckboxGroup
                      value={option.value}
                      onChange={onChange}
                      title={option.value}
                    />
                  )}
                />
              </FormItem>
            ))} */}
          </div>
        </form>
      </Drawer>
    </>
  );
};
