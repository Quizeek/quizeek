import { Duration } from 'luxon';

const toQuizDuration = (seconds: number) => {
  const quizDuration = Duration.fromObject({ seconds });

  return quizDuration.toFormat(`h'h' mm'min'`);
};

export const useFormatters = () => {
  return { toQuizDuration };
};
