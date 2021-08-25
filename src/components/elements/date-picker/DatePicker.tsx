// Ref calendarElement is null causes "Cannot read property 'removeEventListener' of null"
// https://github.com/Kiarash-Z/react-modern-calendar-datepicker/issues/204#issuecomment-757520714

import ReactDatePicker, {
  DayValue,
} from '@hassanmojab/react-modern-calendar-datepicker';
import classNames from 'classnames';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';

import { dateToDayValue, dayValueToDate } from './utils';

dayjs.extend(localizedFormat);

type IChangeEvent = {
  target: { value: Date };
};

type IProps = {
  value?: Date;
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: (event: IChangeEvent) => void;
};

const DatePicker: React.FC<IProps> = ({
  value,
  onChange,
  isDisabled,
  placeholder,
}) => {
  const selectedDay: DayValue = dateToDayValue(value);

  const handleChange = (dayValue: DayValue) => {
    if (onChange) {
      onChange({
        target: {
          value: dayValueToDate(dayValue),
        },
      });
    }
  };

  const renderCustomInput = ({ ref }) => {
    const temp = dayjs(value);
    const formatValue = temp.isValid() ? temp.format('L') : '';

    return (
      <input
        ref={ref}
        className={classNames(
          'w-full h-10 px-4 bg-gray-100 outline-none cursor-pointer focus:ring-1 ring-primary-400 rounded-md',
          {
            'border cursor-not-allowed !bg-gray-50 text-gray-400': isDisabled,
          }
        )}
        readOnly
        placeholder={placeholder || 'Select date'}
        value={formatValue}
        disabled={isDisabled}
      />
    );
  };

  return (
    <ReactDatePicker
      locale="en"
      value={selectedDay}
      onChange={handleChange}
      renderInput={renderCustomInput}
      shouldHighlightWeekends
      colorPrimary="#f37f26"
      colorPrimaryLight="#ffd3b2"
      slideAnimationDuration="0.3s"
      wrapperClassName="TractionWork-DatePicker"
      calendarClassName="TractionWork-DatePicker-calendar"
      calendarPopperPosition="auto"
    />
  );
};

export default DatePicker;
