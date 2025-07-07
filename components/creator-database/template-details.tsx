import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const TemplateDetails: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("creatorDatabase.templateDetails")}</h3>
      <div className="mb-2 border-b border-gray-100" />
      {/* 模板详情内容... */}
      <div className="flex gap-2 mt-2">
        <Button variant="outline" className="rounded-lg border-gray-200 hover:border-[#7A3CEF]">
          {t("creatorDatabase.useTemplate")}
        </Button>
      </div>
    </div>
  );
};

export default TemplateDetails; 