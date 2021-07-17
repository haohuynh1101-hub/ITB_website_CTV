import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';

type ICustomInputProps = {
  value?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef<HTMLDivElement, ICustomInputProps>(
  (props, ref) => {
    const { value, onClick, className, disabled } = props;
    const isOpen = className !== '';
    return (
      <div
        className={classNames(
          'flex items-center h-10 px-4 bg-gray-100 cursor-pointer rounded-md shadow-inner',
          {
            'ring-1 ring-primary-400': isOpen,
            'cursor-not-allowed opacity-75': disabled,
          }
        )}
        onClick={onClick}
        aria-hidden="true"
        ref={ref}
      >
        <span className="flex-1">{value}</span>
      </div>
    );
  }
);

const CustomContainer = ({ className, children }) => {
  return (
    <CalendarContainer className={className}>
      <div className="relative">{children}</div>
    </CalendarContainer>
  );
};

type IEvent = {
  target: { value: Date };
};

type IProps = {
  value?: Date;
  onChange?: (event: IEvent) => void;
  isDisabled?: boolean;
};

export const DatePicker: React.FC<IProps> = ({
  value,
  onChange,
  isDisabled,
}) => {
  const handleChange = (date: Date) => {
    if (onChange) {
      onChange({
        target: {
          value: date,
        },
      });
    }
  };

  return (
    <ReactDatePicker
      selected={dayjs(value).isValid() ? value : new Date()}
      onChange={handleChange}
      customInput={<CustomInput />}
      calendarContainer={CustomContainer}
      dateFormat="dd/MM/yyyy"
      disabled={isDisabled}
    />
  );
};
