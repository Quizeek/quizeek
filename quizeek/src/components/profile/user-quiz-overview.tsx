import { getMyQuizes, getTakenQuizes } from '@/db/queries';
import Link from 'next/link';
import React from 'react';

import QuizAuthorBadge from '../quiz/badge/quiz-author-badge';
import { QuizList } from '../quiz/quiz-list/quiz-list';
import QuizStatusBadge from '../quiz/badge/quiz-status-badge';
import { SearchInput } from '../search-input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type UserQuizOverviewProps = {
  searchText: string;
};

const UserQuizOverview = async ({ searchText }: UserQuizOverviewProps) => {
  const myQuizes = await getMyQuizes(searchText);
  const takenQuizes = await getTakenQuizes(searchText);

  return (
    <Card className="p-3">
      <Tabs defaultValue="my-quizes" className="flex flex-col gap-1">
        <div>
          <TabsList>
            <TabsTrigger value="my-quizes">My quizeeks</TabsTrigger>
            <TabsTrigger value="taken-quizes">Taken quizeeks</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-3">
          <SearchInput
            searchBy="searchText"
            placeholder="Search"
            className="w-full md:w-64 mt-2"
          />

          <Link href="/auth/quiz/create" className="w-full md:w-fit">
            <Button className="w-full">Create new quizeek</Button>
          </Link>
        </div>

        <TabsContent value="my-quizes">
          <QuizList
            quizes={myQuizes}
            getQuizBadge={(quiz) => <QuizStatusBadge quiz={quiz} />}
          />
        </TabsContent>
        <TabsContent value="taken-quizes">
          <QuizList
            quizes={takenQuizes}
            getQuizBadge={(quiz) => <QuizAuthorBadge quiz={quiz} />}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default UserQuizOverview;
