import FormDurationInput from '@/components/form/form-duration-input';
import FormInput from '@/components/form/form-input';
import FormSwitch from '@/components/form/form-switch';
import FormTextArea from '@/components/form/form-text-area';
import React from 'react';

const QuizInfoFormPart = () => {
  return (
    <div className="flex flex-col gap-4 p-1">
      <FormInput name="title" label="Title:" placeholder="Quizeek's title" />

      <FormTextArea
        name="description"
        label="Description:"
        placeholder={`Quizeek's description`}
      />

      <FormDurationInput name="duration" label="Duration:" />

      <FormSwitch name="isActive" labelOn="Active" labelOff="Inactive" />
    </div>
  );
};

export default QuizInfoFormPart;
