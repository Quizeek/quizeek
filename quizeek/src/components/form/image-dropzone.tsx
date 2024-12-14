'use client';

import { useDropzone } from '@uploadthing/react';
import { useCallback } from 'react';
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from 'uploadthing/client';
import { ExpandedRouteConfig } from 'uploadthing/types';

type ImageDropzoneProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  routeConfig?: ExpandedRouteConfig;
};

export const ImageDropzone = ({
  files,
  setFiles,
  routeConfig,
}: ImageDropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  return (
    <div
      {...getRootProps()}
      className="flex h-9 w-full items-center rounded-md border border-input px-3 py-1 text-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm hover:cursor-pointer"
    >
      <input {...getInputProps()} />
      {files.length === 0 && <span>Click or drop file here!</span>}
      {files.length !== 0 && <span>{files[0].name}</span>}
    </div>
  );
};
