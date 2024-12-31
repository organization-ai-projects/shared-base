import dayjs from 'dayjs';

/**
 * Checks if a given date is a weekend.
 * @param date - The date string to check.
 * @returns True if the date is a weekend, otherwise false.
 */
export const isWeekend = (date: string): boolean => {
  const day = dayjs(date).day();
  return day === 0 || day === 6;
};

/**
 * Calculates the difference in days between two dates.
 * @param date1 - First date string
 * @param date2 - Second date string
 * @returns Number of days between the dates
 */
export const dateDifference = (date1: string, date2: string): number =>
  dayjs(date2).diff(dayjs(date1), 'day');

/**
 * Checks if a date string is valid.
 * @param date - The date string to validate
 * @returns True if the date is valid, otherwise false
 */
export const isValidDate = (date: string): boolean => dayjs(date).isValid();

/**
 * Adds days to a given date.
 * @param date - The base date string
 * @param days - Number of days to add
 * @returns Resulting date as string in YYYY-MM-DD format
 */
export const addDays = (date: string, days: number): string =>
  dayjs(date).add(days, 'day').format('YYYY-MM-DD');

/**
 * Subtracts days from a given date.
 * @param date - The base date string
 * @param days - Number of days to subtract
 * @returns Resulting date as string in YYYY-MM-DD format
 */
export const subtractDays = (date: string, days: number): string =>
  dayjs(date).subtract(days, 'day').format('YYYY-MM-DD');

/**
 * Formats a date using a custom format.
 * @param date - The date string to format
 * @param format - The desired format.
 * @returns The formatted date as a string.
 */
export const formatDateAdvanced = (date: string, format: string): string =>
  dayjs(date).format(format);
