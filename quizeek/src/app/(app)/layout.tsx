import Header from '@/components/layout/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <>
      <Header />

      <main className="max-w-[1920px] mx-auto">
        <ScrollArea className="mt-20 h-[calc(100dvh-6rem)]" type="auto">
          <div className="mx-4">{children}</div>
        </ScrollArea>
      </main>
    </>
  );
};

export default Layout;
