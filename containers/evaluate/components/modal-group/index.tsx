import { Button, FormItem, Input, Modal, SelectMulti } from '@components';
import { Controller, useForm } from 'react-hook-form';

import { IFormValues } from '../type';
type IProps = {
  title: string;
  visible: boolean;
  onClose: () => void;
};
export const ModalGroup: React.FC<IProps> = ({ title, visible, onClose }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormValues>();

  const handleMultiChange = (options) => {
    console.log(options, 'options');
    setValue(
      'supporters',
      options.map((option) => option.value),
      {
        shouldValidate: true,
        shouldTouch: true,
      }
    );
  };
  return (
    <>
      <Modal title={title} visible={visible} onCancel={onClose}>
        <form>
          <FormItem label="Người hỗ trợ">
            <Controller
              control={control}
              name="supporters"
              render={({ field: { value } }) => (
                <SelectMulti
                  isMulti
                  name="supporters"
                  placeholder="Người hỗ trợ"
                  options={[]}
                  option={value}
                  onChange={handleMultiChange}
                />
              )}
            />
          </FormItem>

          <div className="grid grid-cols-2 gap-4">
            <FormItem label="Email CTV 1">
              <Controller
                control={control}
                name="member_1"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Email CTV 1"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>

            <FormItem label="Email CTV 2">
              <Controller
                control={control}
                name="member_2"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Email CTV 2"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormItem label="Email CTV 3">
              <Controller
                control={control}
                name="member_3"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Email CTV 3"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>
            <FormItem label="Email CTV 4">
              <Controller
                control={control}
                name="member_4"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Email CTV 4"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormItem label="Email CTV 5">
              <Controller
                control={control}
                name="member_5"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Email CTV 5"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>
            <FormItem label="Email CTV 6">
              <Controller
                control={control}
                name="member_6"
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder="Email CTV 6"
                    value={value}
                    onChange={onChange}
                    type="primary"
                  />
                )}
              />
            </FormItem>
          </div>

          <div className="flex items-center justify-end  space-x-4">
            <div>
              <Button type="default" htmlType="button" title="Quay lại" />
            </div>

            <div>
              <Button type="primary" htmlType="submit" title="Xác nhận" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
