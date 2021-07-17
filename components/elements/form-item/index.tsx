import React from 'react';

type IFormItemProps = {
  label?: string;

  error?: string;

  isRequired?: boolean;

  children: JSX.Element;
};

export const FormItem: React.FC<IFormItemProps> = ({
  label,

  error,

  isRequired,

  children,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor="title" className="block mb-2 font-medium">
          {label} {isRequired ? <span className="text-red-400">*</span> : null}
        </label>
      )}

      <div>{children}</div>

      {error && (
        <div className="mt-2">
          <span className="text-red-400">{error}</span>
        </div>
      )}
    </div>
  );
};
