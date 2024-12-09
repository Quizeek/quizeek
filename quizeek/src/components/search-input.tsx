'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { InputHTMLAttributes } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from './ui/input';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  searchBy: string;
};

export const SearchInput = ({ searchBy, ...props }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(searchBy, term);
    } else {
      params.delete(searchBy);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      {...props}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get(searchBy)?.toString()}
    />
  );
};
