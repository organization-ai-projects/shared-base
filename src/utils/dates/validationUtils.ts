import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('fr');

/**
 * Validates if a given date string is valid according to the specified format and locale.
 *
 * @param date - The date string to validate.
 * @param locale - The locale string to use for validation, defaults to 'fr'.
 * @param format - The date format string to validate against, defaults to 'YYYY-MM-DD'.
 * @returns True if the date string is valid according to the given format and locale, otherwise false.
 */

export const isValidDate = (
  date: string,
  locale: string = 'fr',
  format: string = 'YYYY-MM-DD',
): boolean => {
  return dayjs(date, format).locale(locale).isValid();
};

/**
 * Checks if a given date string is a weekend.
 *
 * @param date - The date string to check.
 * @param locale - The locale string to use for validation, defaults to 'fr'.
 * @param format - The date format string to validate against, defaults to 'YYYY-MM-DD'.
 * @returns True if the date string is a weekend, otherwise false.
 */
export const isWeekend = (
  date: string,
  locale: string = 'fr',
  format: string = 'YYYY-MM-DD',
): boolean => {
  const parsedDate = dayjs(date, format).locale(locale);
  if (!parsedDate.isValid()) {
    return false;
  }
  return parsedDate.day() === 0 || parsedDate.day() === 6;
};

/**
 * Checks if a given date string is a public holiday.
 *
 * Public holidays are currently hardcoded and only include New Year's Day (January 1st), Labour Day (May 1st), and Christmas Day (December 25th).
 *
 * @param date - The date string to check.
 * @returns True if the date string is a public holiday, otherwise false.
 */
export const isPublicHoliday = (date: string): boolean => {
  const publicHolidays = ['2024-01-01', '2024-05-01', '2024-12-25'];
  return publicHolidays.includes(dayjs(date).format('YYYY-MM-DD'));
};
