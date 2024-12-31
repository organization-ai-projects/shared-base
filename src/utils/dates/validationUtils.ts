import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('fr');

export const isValidDate = (
  date: string,
  locale: string = 'fr',
  format: string = 'YYYY-MM-DD',
): boolean => {
  return dayjs(date, format).locale(locale).isValid();
};

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

export const isPublicHoliday = (date: string): boolean => {
  const publicHolidays = ['2024-01-01', '2024-05-01', '2024-12-25'];
  return publicHolidays.includes(dayjs(date).format('YYYY-MM-DD'));
};
