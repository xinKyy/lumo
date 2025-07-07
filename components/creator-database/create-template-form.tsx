import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Label, Input, Button } from '@/components/ui';

const CreateTemplateForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm();
  const [onCancel, setOnCancel] = useState<() => void>(() => () => {});

  const onSubmit = (data: any) => {
    // Handle form submission
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t("creatorDatabase.createTemplate")}</h2>
      <div className="mb-4 border-b border-gray-100" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>{t("creatorDatabase.templateName")}</Label>
          <Input {...register("name", { required: true })} className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]" />
          {errors.name && <span className="text-xs text-red-500">{t("form.required")}</span>}
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-2">
          <Button type="button" variant="outline" className="rounded-lg border-gray-200 hover:border-[#7A3CEF]" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button type="submit" className="bg-[#7A3CEF] text-white hover:bg-[#5B23B4] rounded-lg">
            {t("submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTemplateForm; 