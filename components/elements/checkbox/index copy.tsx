import { ChangeEvent, useState } from 'react';

type IProps = {
  value: string[];
  options: string[];
  onChange: (value: string) => void;
};
export const Checkbox: React.FC<IProps> = ({
  value = [],
  options = [],
  onChange,
}) => {
  const [checkedList, setCheckedList] = useState<string>();

  const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedList(e.target.value);
      onChange(e.target.value);
    }
  };

  return (
    // <>
    //   <input onChange={_handleChange} type="checkbox" value={value} />
    //   {title}
    // </>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="w-5 h-5 border border-gray-400 outline-none appearance-none rounded-md form-tick checked:bg-primary-400 checked:border-transparent transition-all duration-200"
        name="departmentType"
        value={value}
        onChange={_handleChange}
      />
      {/* <span className="ml-2">{title}</span> */}
    </label>
  );
};
