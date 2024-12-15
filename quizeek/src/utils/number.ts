import { Duration } from 'luxon';

export const toQuizDuration = (seconds: number) => {
  const quizDuration = Duration.fromObject({ seconds });

  return quizDuration.toFormat(`h'h' mm'min' ss's`);
};
