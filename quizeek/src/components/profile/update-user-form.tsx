'use client';

import { UpdateUser, updateUserSchema } from '@/db/schema/user';
import { useUpdateUserMutation } from '@/hooks/user';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import FormInput from '../form/form-input';
import SubmitButton from '../form/submit-button';
import { Form } from '../ui/form';

const UpdateUserForm = () => {
  const session = useSession();

  const updateUserMutation = useUpdateUserMutation();

  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: session.data?.user.id ?? '',
      name: session.data?.user.name ?? '',
      email: session.data?.user.email ?? '',
    },
  });

  const onSubmit = async (data: UpdateUser) => {
    await updateUserMutation.mutateAsync(data, {
      onSuccess: async () => {
        await session.update({ ...data });

        form.reset({ ...data });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-3 p-3"
      >
        <FormInput name="name" label="Name:" />
        <FormInput name="email" label="E-mail:" disabled />

        <div
          className={cn(
            'space-y-2',
            !form.formState.isDirty && 'hidden md:block md:invisible'
          )}
        >
          <p className="hidden md:block md:invisible">.</p>

          <SubmitButton
            className="w-full md:w-20"
            isLoading={updateUserMutation.isPending}
          >
            Update
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
