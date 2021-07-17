import { Button, FormItem, Input } from '@components';
import { Controller, useForm } from 'react-hook-form';
interface FormLoginValue {
  email: string;
  password: string;
}

const Login = () => {
  const { control } = useForm<FormLoginValue>();

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form className=" shadow-md rounded-md">
        <FormItem label="Email">
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

        <FormItem label="Password:">
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input placeholder="Password" value={value} onChange={onChange} />
            )}
          />
        </FormItem>

        <Button title="Đăng nhập" type="primary" />
      </form>
    </div>
  );
};
export default Login;
