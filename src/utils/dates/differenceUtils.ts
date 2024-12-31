import dayjs from 'dayjs';

/**
 * Calculates the difference between two dates in a specified unit.
 * @param startDate - The start date string.
 * @param endDate - The end date string.
 * @param unit - The unit of difference (e.g., 'days', 'months', 'years'). Defaults to 'days'.
 * @returns The difference between the two dates in the specified unit.
 */
export const dateDifference = (
  startDate: string,
  endDate: string,
  unit: 'days' | 'months' | 'years' = 'days',
): number => dayjs(endDate).diff(dayjs(startDate), unit);
