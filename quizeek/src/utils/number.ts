import { Duration } from 'luxon';

export const toQuizDuration = (seconds?: number) => {
  if (!seconds) {
    return '';
  }

  const quizDuration = Duration.fromObject({ seconds });

  return quizDuration.toFormat(`h'h' mm'm' ss's`);
};
