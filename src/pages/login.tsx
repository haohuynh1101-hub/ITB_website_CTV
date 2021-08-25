import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormItem, Input } from 'components';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch } from '@/hooks';
import { loginAsync } from '@/redux/reducers/auth';
interface FormLoginValue {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
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
    try {
      const result = await dispatch(
        loginAsync({ email: values.email, password: values.password })
      );
      console.log(result, '==>result');
    } catch (error) {
      console.log(error, '==>error');
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-md rounded-md space-y-4">
        <div className="flex items-center justify-center text-xl font-medium space-x-4">
          <Image src="/LogoITB.png" width={60} height={60} />
          <span>ITB Club</span>
        </div>
        <form
          className=""
          style={{ width: '540px' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormItem label="Email" isRequired error={errors?.email?.message}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Your Email"
                  value={value}
                  onChange={onChange}
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
                />
              )}
            />
          </FormItem>

          <FormItem>
            <Button
              title="Đăng nhập"
              type="primary"
              htmlType="submit"
              onClick={handleSubmit(onSubmit)}
            />
          </FormItem>
        </form>
      </div>
    </div>
  );
};
export default Login;
