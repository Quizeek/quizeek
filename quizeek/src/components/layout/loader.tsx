import { Loader as LoaderIco } from 'lucide-react';
import React from 'react';

type LoaderProps = {
  text?: string;
};

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="flex flex-row gap-3">
      <LoaderIco className="animate-spin" />
      <span>{text ?? 'Loading...'}</span>
    </div>
  );
};

export default Loader;
