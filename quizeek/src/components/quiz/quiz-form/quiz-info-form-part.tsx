import FormDurationInput from '@/components/form/form-duration-input';
import { FormImageDropzone } from '@/components/form/form-image-dropzone';
import FormInput from '@/components/form/form-input';
import FormSwitch from '@/components/form/form-switch';
import FormTextArea from '@/components/form/form-text-area';
import React from 'react';
import { ExpandedRouteConfig } from 'uploadthing/types';

type QuizInfoFormPartProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  routeConfig: ExpandedRouteConfig | undefined;
};

const QuizInfoFormPart = ({
  files,
  setFiles,
  routeConfig,
}: QuizInfoFormPartProps) => {
  return (
    <div className="flex flex-col gap-4 p-1">
      <FormInput name="title" label="Title:" placeholder="Quizeek's title" />

      <FormTextArea
        name="description"
        label="Description:"
        placeholder={`Quizeek's description`}
      />

      <FormDurationInput name="duration" label="Duration:" />

      <FormImageDropzone
        files={files}
        setFiles={setFiles}
        routeConfig={routeConfig}
      />

      <FormSwitch name="isActive" labelOn="Active" labelOff="Inactive" />
    </div>
  );
};

export default QuizInfoFormPart;
