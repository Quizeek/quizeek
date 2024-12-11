'use client';

import LogoDark from '@/assets/images/logo-dark.svg';
import LogoLight from '@/assets/images/logo-light.svg';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type LogoProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height'
>;

const Logo = (props: LogoProps) => {
  const { theme } = useTheme();

  const [src, setSrc] = useState();

  useEffect(() => {
    setSrc(theme === 'light' ? LogoLight : LogoDark);
  }, [theme]);

  if (!src) {
    return;
  }

  return (
    <Image src={src} alt="Quizeek logo" width={522} height={413} {...props} />
  );
};

export default Logo;
