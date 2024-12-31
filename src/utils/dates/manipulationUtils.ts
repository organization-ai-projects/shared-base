import dayjs from 'dayjs';

export const addDays = (date: string, days: number): string =>
  dayjs(date).add(days, 'day').format('YYYY-MM-DD');

export const subtractDays = (date: string, days: number): string =>
  dayjs(date).subtract(days, 'day').format('YYYY-MM-DD');

export const addMonths = (date: string, months: number): string =>
  dayjs(date).add(months, 'month').format('YYYY-MM-DD');

export const subtractMonths = (date: string, months: number): string =>
  dayjs(date).subtract(months, 'month').format('YYYY-MM-DD');
