import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface TemplateCardProps {
  template: {
    name: string;
    description: string;
  };
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl shadow-sm bg-white hover:shadow-md transition p-4 border border-gray-100">
      <h4 className="font-semibold text-gray-900 mb-2 truncate">{template.name}</h4>
      <p className="text-sm text-gray-500 mb-2 truncate">{template.description}</p>
      <div className="flex gap-2 mt-2">
        <Button variant="outline" className="rounded-lg border-gray-200 hover:border-[#7A3CEF]">
          {t("creatorDatabase.useTemplate")}
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard; 