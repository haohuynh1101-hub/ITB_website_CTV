import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  FormItem,
  Input,
  SelectControlled,
  SelectMulti,
} from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const departmentOptions = [
  { value: '1', label: 'Học thuật' },
  { value: '2', label: 'Truyền thông' },
  { value: '3', label: 'Sự kiện' },
  { value: '4', label: 'Nhân sự' },
];
const abilityOptions = [
  {
    key: '1',
    value: 'Lãnh đạo',
    isChecked: false,
  },
  {
    key: '2',
    value: 'Tổ chức',
    isChecked: false,
  },
  {
    key: '3',
    value: 'Thiết kế',
    isChecked: false,
  },
  {
    key: '4',
    value: 'Chụp ảnh',
    isChecked: false,
  },
  {
    key: '5',
    value: 'Viết bài',
    isChecked: false,
  },
  {
    key: '6',
    value: 'MC',
    isChecked: false,
  },
  {
    key: '7',
    value: 'Hát - Nhảy',
    isChecked: false,
  },
  {
    key: '8',
    value: 'Vẽ',
    isChecked: false,
  },
  {
    key: '9',
    value: 'Làm đồ thủ công',
    isChecked: false,
  },
  {
    key: '10',
    value: 'Lập trình',
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
  ability: string[];
  departmentId: string[];
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
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormValue>({
    resolver: yupResolver(schema),
  });

  const [ability, setAbility] = useState<string[]>([]);
  const [multiValue, setMultiValue] = useState<string[]>([]);

  const _handleSelectDepartment = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      ability.push(value);
      setAbility[value];
    } else {
      const index = ability.indexOf(value);
      if (index > -1) {
        ability.splice(index, 1);
        setAbility(ability);
      }
    }
    setValue('ability', ability);
  };

  // function handleMultiChange(options) {
  //   if (options) {
  //     multiValue.push(options);
  //     setMultiValue(options);
  //   }
  //   setValue('departmentId', options.ma);
  // }
  const handleMultiChange = (options) => {
    console.log(options, 'options');
    setValue(
      'departmentId',
      options.map((option) => option.value),
      {
        shouldValidate: true,
        shouldTouch: true,
      }
    );
  };
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
        width="720px"
        footer={
          <Button
            title="Tạo"
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

          <div className=" grid md:grid-cols-3 gap-4">
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

          <FormItem
            label="Ban ứng tuyển"
            isRequired
            error={errors.email?.message}
          >
            <Controller
              control={control}
              name="departmentId"
              render={({ field: { value } }) => (
                <SelectMulti
                  isMulti
                  name="departmentId"
                  placeholder="Ban ứng tuyển"
                  options={departmentOptions}
                  option={value}
                  onChange={handleMultiChange}
                />
              )}
            />
          </FormItem>

          <FormItem label="Khả năng nổi bật" isRequired>
            <div className="grid grid-cols-5 gap-4">
              {abilityOptions.map((option, index) => (
                <Controller
                  key={index}
                  control={control}
                  name="ability"
                  render={() => (
                    <Checkbox
                      value={option.value}
                      title={option.value}
                      onChange={_handleSelectDepartment}
                    />
                  )}
                />
              ))}
            </div>
          </FormItem>
        </form>
      </Drawer>
    </>
  );
};
