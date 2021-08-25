import { yupResolver } from '@hookform/resolvers/yup';
import {
  DatePicker,
  Drawer,
  FormItem,
  Input,
  SelectControlled,
  SelectMulti,
} from 'components/elements';
import { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { FooterForm } from '@/components/drawer-ctv/FooterForm';
import { useAppDispatch } from '@/hooks';
import {
  createCandidateAsync,
  updateCandidatesAsync,
} from '@/redux/reducers/candidate';
import { RequestCandidateBody } from '@/services/api/candidate';

import { abilityOptions, departmentOptions } from '../constants';
import { IFormValue } from '../type';

type IProps = {
  visible: boolean;
  onClose: () => void;
  defaultValues?: IFormValue;
  //
  onCreate?: (body: RequestCandidateBody) => void;
  onAfterVisibleChange: (visible: boolean) => void;
};

const schema = yup.object().shape({
  fullName: yup.string().required('is required'),
  email: yup.string().email().required('is required'),
  birthday: yup.string().required('is required'),
  phone: yup.string().required('is required'),
  mssv: yup.string().required('is required'),
  department: yup
    .array()
    .of(yup.string())
    .min(1, 'is required')
    .required('is required'),
  address: yup.string().required('is required'),
  gender: yup.string().required('is required'),
  ability: yup
    .array()
    .of(yup.string())
    .min(1, 'is required')
    .required('is required'),
  major: yup.string().required('is required'),
});
export const DrawerCTV: React.FC<IProps> = ({
  visible,
  onClose,
  defaultValues,
  onAfterVisibleChange,
}) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState({ update: false, archive: false });
  const [isRendered, setIsRendered] = useState(false);
  const isRenderedForm = useRef(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const isUpdate = defaultValues?._id;

  useEffect(() => {
    if (!isRenderedForm.current && visible) {
      setTimeout(() => {
        setIsRendered(true);
        isRenderedForm.current = true;
      });
    }
  }, [visible]);

  useEffect(() => {
    if (defaultValues?._id) {
      reset({
        fullName: defaultValues.fullName,
        email: defaultValues.email,
        birthday: defaultValues.birthday,
        phone: defaultValues.phone,
        mssv: defaultValues.mssv,
        department: defaultValues.department,
        address: defaultValues.address,
        gender: defaultValues.gender,
        ability: defaultValues.ability,
        major: defaultValues.major,
      });
    } else {
      reset({
        fullName: '',
        email: '',
        birthday: new Date(),
        phone: '',
        mssv: '',
        department: [],
        address: '',
        gender: 'Nam',
        ability: [],
        major: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const handleMultiChange = (options) => {
    setValue(
      'department',
      options.map((option) => option.value),
      {
        shouldValidate: true,
        shouldTouch: true,
      }
    );
  };

  const handleMultiAbilityChange = (options) => {
    setValue(
      'ability',
      options.map((option) => option.value),
      {
        shouldValidate: true,
        shouldTouch: true,
      }
    );
  };

  const onSubmit: SubmitHandler<IFormValue> = async (data) => {
    const body: RequestCandidateBody = {
      ...data,
      role: 'CANDIDATE',
      birthday: new Date(data.birthday).toDateString(),
    };
    setLoading((prevState) => ({ ...prevState, update: true }));

    try {
      if (isUpdate) {
        const result = await dispatch(
          updateCandidatesAsync({ candidateId: defaultValues._id, data: body })
        );
        if (!result) {
          return toast.error('Cập nhật không thành công');
        }
        toast.success('Cập nhật thành công');
      } else {
        const result = await dispatch(createCandidateAsync({ data: body }));
        if (!result) {
          return toast.error('Tạo không thành công');
        }
        toast.success('Tạo thành công');
      }
    } catch (error) {
      toast.error('Tạo không thành công');
    } finally {
      setLoading((prevState) => ({ ...prevState, update: false }));
      onClose();
    }
  };

  const renderForm = () => {
    if (!isRendered) {
      return null;
    }
    return (
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

          <FormItem label="Giới tính" isRequired error={errors.gender?.message}>
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <SelectControlled
                  options={[
                    { name: 'Nam', value: 'Nam' },
                    { name: 'Nữ', value: 'Nữ' },
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
            error={errors.mssv?.message}
          >
            <Controller
              control={control}
              name="mssv"
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

          <FormItem label="Lớp" isRequired error={errors.major?.message}>
            <Controller
              control={control}
              name="major"
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
            error={errors.phone?.message}
          >
            <Controller
              control={control}
              name="phone"
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
            name="linkFB"
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
          error={(errors.department as any)?.message}
        >
          <Controller
            control={control}
            name="department"
            defaultValue={[]}
            render={({ field: { value } }) => (
              <SelectMulti
                isMulti
                name="department"
                placeholder="Ban ứng tuyển"
                options={departmentOptions}
                option={value}
                onChange={handleMultiChange}
              />
            )}
          />
        </FormItem>

        <FormItem
          label="Khả năng nổi bật"
          isRequired
          error={(errors.ability as any)?.message}
        >
          <Controller
            control={control}
            name="ability"
            defaultValue={[]}
            render={({ field: { value } }) => (
              <SelectMulti
                isMulti
                name="ability"
                placeholder="Khả năng nổi bật"
                options={abilityOptions}
                option={value}
                onChange={handleMultiAbilityChange}
              />
            )}
          />
        </FormItem>
      </form>
    );
  };

  return (
    <>
      <Drawer
        visible={visible}
        title={isUpdate ? 'Cập nhật CTV' : 'Tạo mới CTV'}
        placement="right"
        footer={
          <FooterForm
            isUpdate={isUpdate}
            isSubmitting={loading.update}
            onClick={handleSubmit(onSubmit)}
          />
        }
        onClose={onClose}
        afterVisibleChange={onAfterVisibleChange}
      >
        {renderForm()}
      </Drawer>
    </>
  );
};
