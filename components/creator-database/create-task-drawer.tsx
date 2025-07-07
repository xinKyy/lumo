import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

const CreateTaskDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission
  };

  const onCancel = () => {
    // Handle cancel
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="max-w-lg w-full p-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t("creatorDatabase.createTask")}</h2>
          <div className="mb-4 border-b border-gray-100" />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>{t("creatorDatabase.taskName")}</Label>
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
      </SheetContent>
    </Sheet>
  );
};

export default CreateTaskDrawer; 