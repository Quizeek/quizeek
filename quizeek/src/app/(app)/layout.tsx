import React, { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default Layout;
