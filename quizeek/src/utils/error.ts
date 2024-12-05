import { InvalidDataError } from '@/models';
import { ZodError } from 'zod';

export const handleServerActionError = (error: unknown) => {
  if (error instanceof InvalidDataError) {
    throw error;
  }

  if (error instanceof ZodError) {
    throw new InvalidDataError(error.errors.map((e) => e.message).join(' | '));
  }

  throw new Error('Something went wrong');
};
