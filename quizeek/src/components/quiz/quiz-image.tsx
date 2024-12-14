import { QuizWithUser } from '@/db/schema/quiz';
import Image from 'next/image';

import Logo from '../logo';

type QuizImageProps = {
  quiz: QuizWithUser;
  width: number;
  height: number;
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height'
>;

export const QuizImage = ({
  quiz,
  width,
  height,
  ...props
}: QuizImageProps) => {
  return (
    <>
      {quiz.imageUrl && (
        <Image
          src={quiz.imageUrl}
          alt={quiz.title}
          width={width}
          height={height}
          {...props}
        />
      )}
      {!quiz.imageUrl && <Logo {...props} />}
    </>
  );
};
