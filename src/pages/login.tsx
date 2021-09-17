import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormItem, Input } from 'components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { withAuthentication } from '@/hoc/withAuthentication';
import { useAppDispatch } from '@/hooks';
import { loginAsync } from '@/redux/reducers/auth';
interface FormLoginValue {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginValue>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: FormLoginValue) => {
    setLoading(true);
    try {
      const result = await dispatch(
        loginAsync({ email: values.email, password: values.password })
      );
      if (result.meta.requestStatus === 'rejected') {
        return toast.error('Fail to login');
      }

      router.push('/');
      toast.success('Login successfully');
    } catch (error) {
      toast.error('Fail to login');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-md rounded-md space-y-4">
        <div className="flex items-center justify-center text-xl font-medium space-x-4">
          <Image src="/LogoITB.png" width={60} height={60} />
          <span>ITB Club</span>
        </div>
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <FormItem label="Email" isRequired error={errors?.email?.message}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Your Email"
                  value={value}
                  onChange={onChange}
                  bordered
                />
              )}
            />
          </FormItem>

          <FormItem
            label="Password:"
            isRequired
            error={errors?.password?.message}
          >
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Password"
                  value={value}
                  onChange={onChange}
                  htmlType="password"
                  bordered
                />
              )}
            />
          </FormItem>

          <FormItem>
            <Button
              title="Đăng nhập"
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              onClick={handleSubmit(onSubmit)}
            />
          </FormItem>
        </form>
      </div>
    </div>
  );
};
export default withAuthentication(Login, 'login');
