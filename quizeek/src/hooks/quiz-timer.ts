import { DateTime, Duration } from 'luxon';
import { useEffect, useState } from 'react';

type UseQuizTimerProps = {
  attemptTimestamp: string;
  quizTimeLimitSeconds: number;
};

export const useQuizTimer = ({
  attemptTimestamp,
  quizTimeLimitSeconds,
}: UseQuizTimerProps) => {
  const [timer, setTimer] = useState('');
  const [isTimerUp, setIsTimerUp] = useState(false);

  useEffect(() => {
    const startDateTime = DateTime.fromSQL(attemptTimestamp).plus(
      Duration.fromObject({
        hour: 1,
      })
    );
    const endDateTime = startDateTime.plus(
      Duration.fromObject({ seconds: quizTimeLimitSeconds })
    );

    const intervalId = setInterval(() => {
      const currentDateTime = DateTime.local().toUTC();
      const timeleft = endDateTime.diff(currentDateTime, [
        'hours',
        'minutes',
        'seconds',
      ]);

      if (timeleft.seconds <= 0) {
        setTimer("Time's up!");
        setIsTimerUp(true);
        clearInterval(intervalId);
        return;
      }

      // Format the duration (remove 0h and 0m)
      const formattedTimer = timeleft
        .toFormat("h'h' m'm' s's'")
        .replace(/^0h/, '')
        .replace(/\s0m/, '');

      setTimer(formattedTimer);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [attemptTimestamp, quizTimeLimitSeconds]);

  return { timer, isTimerUp };
};
