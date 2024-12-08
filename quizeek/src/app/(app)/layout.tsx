import Header from '@/components/layout/header';
import React, { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div>
      <Header />

      <div className="mt-20 mx-4 md:mx-32">{children}</div>
    </div>
  );
};

export default Layout;
