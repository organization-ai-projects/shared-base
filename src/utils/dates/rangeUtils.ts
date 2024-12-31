import dayjs from 'dayjs';

export const isDateInRange = (date: string, start: string, end: string): boolean => {
  const parsedDate = dayjs(date);
  return parsedDate.isAfter(dayjs(start)) && parsedDate.isBefore(dayjs(end));
};

export const generateDateRange = (start: string, end: string, intervalDays: number): string[] => {
  const dates: string[] = [];
  let current = dayjs(start);

  while (current.isBefore(dayjs(end))) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(intervalDays, 'day');
  }

  return dates;
};
