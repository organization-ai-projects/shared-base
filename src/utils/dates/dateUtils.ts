import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale('fr');

/**
 * Formats a given date into a localized string representation.
 *
 * @param date - The date to be formatted, either as a Date object or a string.
 * @param locale - The locale string that determines the format of the output. Defaults to 'fr-FR'.
 * @param options - An object specifying options for the date formatting. Defaults to show year, long month, and day.
 * @returns A string representing the formatted date according to the specified locale and options.
 * @throws Will throw an error if the provided date is invalid.
 */
export function formatDate(
  date: Date | string,
  locale = 'fr-FR',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date provided.');
  }
  return parsedDate.toLocaleDateString(locale, options);
}
