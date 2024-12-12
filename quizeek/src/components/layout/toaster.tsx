'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { Toaster as Sonner } from 'sonner';

const Toaster = () => {
  const { theme } = useTheme();

  return (
    <Sonner
      duration={3000}
      closeButton={true}
      richColors={true}
      theme={theme === 'light' ? 'light' : 'dark'}
    />
  );
};

export default Toaster;
