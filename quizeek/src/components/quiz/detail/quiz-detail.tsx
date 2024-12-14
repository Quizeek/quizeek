import { auth } from '@/auth';
import { QuizWithUser } from '@/db/schema/quiz';

import QuizAuthorBadge from '../quiz-author-badge';
import { QuizImage } from '../quiz-image';
import QuizTimeBadge from '../quiz-time-badge';
import { QuizDetailActions } from './quiz-detail-actions';
import { QuizDetailMyAttemps } from './quiz-detail-my-attempts';
import { QuizDetailOtherAttemps } from './quiz-detail-other-attempts';

type QuizDetailProps = {
  quiz: QuizWithUser;
};

export const QuizDetail = async ({ quiz }: QuizDetailProps) => {
  const session = await auth();
  const user = session?.user;
  const isOwner = user && quiz.createdBy === user.id;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex md:flex-row gap-4 flex-col">
        <QuizImage
          quiz={quiz}
          width={500}
          height={500}
          className="rounded-lg w-60 h-60"
        />

        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-xl font-bold text-foreground">{quiz.title}</h2>
          <p className="text-foreground">{quiz.description}</p>
          <div className="mt-auto flex">
            <div className="self-end flex flex-col gap-2">
              <QuizAuthorBadge quiz={quiz} />
              <QuizTimeBadge quiz={quiz} />
            </div>

            <QuizDetailActions user={user} quiz={quiz} />
          </div>
        </div>
      </div>

      {!(!quiz.isActive && isOwner) && (
        <div className="flex flex-col lg:flex-row gap-8">
          {user && !(quiz.isActive && isOwner) && (
            <QuizDetailMyAttemps quiz={quiz} />
          )}
          <QuizDetailOtherAttemps quiz={quiz} />
        </div>
      )}
    </div>
  );
};
