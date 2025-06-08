import { Building, CheckCircle, Copy, CreditCard, Heart } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

const DonatePage: React.FC = () => {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const bankDetails = {
    bankName: t('donate.bankTransfer.bankNameValue'),
    accountHolder: "Association Forsa",
    rib: "350 810 000000001309248846",
    iban: "MA64 350 810 000000001309248846",
    swift: "BMCEMAMC"
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-secondary-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('donate.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t('donate.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bank Details */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center mb-6">
                <Building size={32} className="text-primary-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('donate.bankTransfer.title')}</h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('donate.bankTransfer.description')}
              </p>
              
              {/* Bank Information */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('donate.bankTransfer.bankName')}</p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">{bankDetails.bankName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('donate.bankTransfer.accountHolder')}</p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">{bankDetails.accountHolder}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('donate.bankTransfer.ribLabel')}</p>
                      <p className="text-lg font-mono font-semibold text-gray-800 dark:text-white">{bankDetails.rib}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.rib, 'rib')}
                      className="ml-3 p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-md transition-colors"
                      title={t('donate.bankTransfer.copyRib')}
                    >
                      {copiedField === 'rib' ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('donate.bankTransfer.ibanLabel')}</p>
                      <p className="text-lg font-mono font-semibold text-gray-800 dark:text-white">{bankDetails.iban}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                      className="ml-3 p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-md transition-colors"
                      title={t('donate.bankTransfer.copyIban')}
                    >
                      {copiedField === 'iban' ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                </div>
                
                
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-start">
                  <CreditCard size={20} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">{t('donate.bankTransfer.importantNote')}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {t('donate.bankTransfer.noteText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Impact Information */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('donate.impact.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {t('donate.impact.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-500 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">{t('donate.callToAction.title')}</h2>
            <p className="text-xl mb-8">
              {t('donate.callToAction.description')}
            </p>
            <a href="https://wa.me/212675900514" target="_blank" rel="noopener noreferrer">
              <Button  
                variant="outline"  
                size="lg"  
                className="!bg-white !text-black !border-white hover:!bg-orange-500 hover:!text-white"
              > 
                {t('donate.callToAction.button')}
              </Button>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;