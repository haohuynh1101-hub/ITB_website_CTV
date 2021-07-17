import * as React from 'react';
import { useForm } from 'react-hook-form';

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log('change', event.target.value);
};

export const DrawerCTV = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: { fruit: string[] }) => alert(JSON.stringify(data));

  return (
    <CheckboxGroup name="fruits" value={fruits} onChange={setFruits}>
      {(Checkbox) => (
        <>
          <label>
            <Checkbox value="apple" /> Apple
          </label>
          <label>
            <Checkbox value="orange" /> Orange
          </label>
          <label>
            <Checkbox value="watermelon" /> Watermelon
          </label>
        </>
      )}
    </CheckboxGroup>
  );
};
