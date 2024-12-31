import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';

dayjs.locale('fr');
dayjs.extend(duration);
dayjs.extend(relativeTime);

/**
 * Formats a date string according to the specified format.
 *
 * @param date - The date string to format.
 * @param format - The desired format for the output date string. Defaults to 'YYYY-MM-DD'.
 * @returns The formatted date as a string.
 */

export const formatDate = (date: string, format: string = 'YYYY-MM-DD'): string =>
  dayjs(date).format(format);

/**
 * Formats a date into a localized string representation.
 *
 * @param date - The date to be formatted, either as a Date object or a string.
 * @param locale - The locale string that determines the format of the output. Defaults to 'fr-FR'.
 * @param options - An object specifying options for the date formatting. Defaults to show year, long month, and day.
 * @returns A string representing the formatted date according to the specified locale and options.
 * @throws Will throw an error if the provided date is invalid.
 */

export const formatLocalized = (
  date: Date | string,
  locale = 'fr-FR',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date provided.');
  }
  return parsedDate.toLocaleDateString(locale, options);
};

/**
 * Formats the difference between two dates as a string.
 *
 * @param start - The start date string.
 * @param end - The end date string.
 * @returns A string representing the difference between the two dates in the format 'X years, Y months, Z days'.
 */
export const formatDateDifference = (start: string, end: string): string => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const isNegative = endDate.isBefore(startDate);

  let years = 0;
  let months = 0;
  let days = 0;

  if (isNegative) {
    let tempDate = startDate;
    years = tempDate.diff(endDate, 'year');
    tempDate = tempDate.subtract(years, 'year');
    months = tempDate.diff(endDate, 'month');
    tempDate = tempDate.subtract(months, 'month');
    days = tempDate.diff(endDate, 'day');
  } else {
    let tempDate = endDate;
    years = tempDate.diff(startDate, 'year');
    tempDate = tempDate.subtract(years, 'year');
    months = tempDate.diff(startDate, 'month');
    tempDate = tempDate.subtract(months, 'month');
    days = tempDate.diff(startDate, 'day');
  }

  const sign = isNegative ? '-' : '';
  return `${sign}${Math.abs(years)} years, ${Math.abs(months)} months, ${Math.abs(days)} days`;
};
