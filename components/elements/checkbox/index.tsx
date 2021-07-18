import React from 'react';
type ICheckboxProps = {
  value: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
};
export const Checkbox: React.FC<ICheckboxProps> = ({
  value,
  onChange,
  title,
}) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="w-5 h-5 shadow-inner outline-none rounded-md form-tick checked:bg-primary-400 checked:border-transparent transition-all duration-200"
        name="departmentType"
        value={value}
        onChange={onChange}
      />
      <span className="ml-2">{title}</span>
    </label>
  );
};
