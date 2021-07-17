import { ChangeEvent, useState } from 'react';

type IProps = {
  value: string[];
  name?: string;
  onChange: (value: string) => void;
  title: string;
};
export const CheckboxGroup: React.FC<IProps> = ({
  value,
  onChange,
  name,
  title,
}) => {
  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <label>
      <input
        name={name}
        type="checkbox"
        value={value}
        onChange={_handleChange}
        // ref={register({ required: 'Please select fruits' })}
      />{' '}
      {title}
    </label>
    // <label className="inline-flex items-center">
    //   <input
    //     type="checkbox"
    //     className="w-5 h-5 border border-gray-400 outline-none appearance-none rounded-md form-tick checked:bg-primary-400 checked:border-transparent transition-all duration-200"
    //     name="departmentType"
    //     value={value}
    //     onChange={_handleChange}
    //   />
    //   {/* <span className="ml-2">{title}</span> */}
    // </label>
  );
};
