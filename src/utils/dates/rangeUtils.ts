import dayjs from 'dayjs';

/**
 * Checks if a given date is in a specified range.
 * @param date - The date string to check
 * @param start - The start of the range
 * @param end - The end of the range
 * @returns True if the date is in the range, otherwise false
 */
export const isDateInRange = (date: string, start: string, end: string): boolean => {
  const parsedDate = dayjs(date);
  return parsedDate.isAfter(dayjs(start)) && parsedDate.isBefore(dayjs(end));
};

/**
 * Generates an array of dates from a start date to an end date, with a specified interval in days.
 * @param start - The start of the range
 * @param end - The end of the range
 * @param intervalDays - The interval in days between two consecutive dates
 * @returns An array of dates in the range, in the format "YYYY-MM-DD"
 */
export const generateDateRange = (start: string, end: string, intervalDays: number): string[] => {
  const dates: string[] = [];
  let current = dayjs(start);

  while (current.isBefore(dayjs(end))) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(intervalDays, 'day');
  }

  return dates;
};
