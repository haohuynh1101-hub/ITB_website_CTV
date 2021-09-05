import classNames from 'classnames';
import React from 'react';
type IFormItemProps = {
  label?: string;
  error?: string;
  description?: string;
  isRequired?: boolean;
  isNoSpace?: boolean;
  isHidden?: boolean;
  children: JSX.Element;
};

export const FormItem: React.FC<IFormItemProps> = ({
  label,
  error,
  description,
  isRequired,
  isNoSpace,
  isHidden,
  children,
}) => {
  return (
    <div
      className={classNames({
        'mb-4': !isNoSpace,
        hidden: isHidden,
      })}
    >
      {label && (
        <label
          htmlFor="title"
          className="block mb-2 font-medium line-height-normal"
        >
          {label} {isRequired ? <span className="text-red-400">*</span> : null}
        </label>
      )}

      <div>{children}</div>

      {description && (
        <div className="mt-2">
          <span className="text-gray-400">{description}</span>
        </div>
      )}

      {error && (
        <div className="mt-2">
          <span className="text-red-400 animate__animated animate__fadeIn animate__faster">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};
