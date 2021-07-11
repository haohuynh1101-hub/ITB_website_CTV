import { Button, FormItem, Input, SelectControlled } from '@components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormValue {
  title: string;
  ownerId: string;
}
type IProps = {
  defaultValue?: IFormValue;
};

const schema = yup.object().shape({
  title: yup.string(),
  ownerId: yup.string(),
});
export const FormEvaluate: React.FC<IProps> = ({ defaultValue }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormValue>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <form>
        <div className="grid items-center gap-4 grid-cols-4">
          <div className=" col-span-3">
            <FormItem error={errors.title?.message} isRequired>
              <Controller
                control={control}
                name="title"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <Input
                    type="primary"
                    placeholder="Nội dung nhận xét"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormItem>
          </div>

          <div className="flex space-x-4 col-span-1">
            <div>
              <FormItem error={errors.title?.message} isRequired>
                <Controller
                  control={control}
                  name="title"
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <SelectControlled
                      options={[]}
                      placeholder="Nội dung nhận xét"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </FormItem>
            </div>

            <div>
              <Button title="Lưu" type="primary" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
