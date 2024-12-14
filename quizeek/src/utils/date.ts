import { DateTime } from 'luxon';

export const toLocalDateTimeString = (utc: string) => {
  const dateTime = DateTime.fromSQL(utc);
  const localDateTime = dateTime.toLocal();

  return localDateTime.toLocaleString(DateTime.DATETIME_SHORT);
};
