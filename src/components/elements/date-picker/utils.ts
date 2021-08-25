import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import dayjs from 'dayjs';

export const dayValueToDate = (selectedDay: DayValue) => {
  return new Date(
    selectedDay.year,
    selectedDay.month - 1, // the month is 0-indexed
    selectedDay.day
  );
};

export const dateToDayValue = (date: Date): DayValue => {
  if (!dayjs(date).isValid()) {
    return null;
  }

  return {
    day: date?.getDate(),
    month: date?.getMonth() + 1, // DayValue.month is 1-indexed
    year: date?.getFullYear(),
  };
};
