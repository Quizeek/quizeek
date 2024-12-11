'use server';

import { db } from '@/db';
import { UpdateUser, updateUserSchema, users } from '@/db/schema/user';
import { InvalidDataError } from '@/models';
import { handleServerActionError } from '@/utils';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const updateUserAction = async (body: UpdateUser) => {
  try {
    const { id, ...rest } = await updateUserSchema.parseAsync(body);

    const updatedUsers = await db
      .update(users)
      .set({ ...rest })
      .where(eq(users.id, id))
      .returning();

    if (updatedUsers.length !== 1) {
      throw new InvalidDataError('User does not exist');
    }

    revalidatePath('/auth/profile');
  } catch (error) {
    handleServerActionError(error);
  }
};
