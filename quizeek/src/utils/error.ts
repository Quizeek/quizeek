import { InvalidDataError, InvalidSessionError } from '@/models';
import { ZodError } from 'zod';

export const handleError = (error: unknown) => {
  if (error instanceof InvalidDataError) {
    return error;
  }

  if (error instanceof InvalidSessionError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new InvalidDataError(error.errors.map((e) => e.message).join(' | '));
  }

  return new Error('Something went wrong');
};
