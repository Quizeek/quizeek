import Header from '@/components/layout/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <>
      <Header />

      <main>
        <ScrollArea className="mt-20 h-[calc(100dvh-6rem)]" type="auto">
          <div className="mx-4 md:mx-32">{children}</div>
        </ScrollArea>
      </main>
    </>
  );
};

export default Layout;
