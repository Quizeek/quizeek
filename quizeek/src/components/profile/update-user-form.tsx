'use client';

import { UpdateUser, updateUserSchema } from '@/db/schema/user';
import { useUpdateUserMutation } from '@/hooks';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { SessionContextValue } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import ActionButton from '../action-button';
import FormInput from '../form/form-input';
import { Form } from '../ui/form';

type UpdateUserFormProps = {
  session: SessionContextValue;
};

const UpdateUserForm = ({ session }: UpdateUserFormProps) => {
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

        toast.success('Successfully updated name');
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-3"
      >
        <FormInput name="name" label="Name:" />
        <FormInput name="email" label="E-mail:" disabled />

        <div>
          <ActionButton
            className={cn(
              'w-full md:w-20 md:mt-8',
              !form.formState.isDirty && 'hidden md:block md:invisible'
            )}
            isLoading={updateUserMutation.isPending}
            type="submit"
          >
            Update
          </ActionButton>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
