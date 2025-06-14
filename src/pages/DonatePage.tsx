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
    <div className="pt-24 pb-20 w-full max-w-full overflow-x-hidden">
      {/* Page Header */}
      <div className="bg-secondary-400 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('donate.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t('donate.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start w-full max-w-full">
          {/* Bank Details */}
          <div className="w-full max-w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 mb-8 w-full max-w-full">
              <div className="flex items-center mb-6">
                <Building size={28} className="text-primary-500 mr-3 flex-shrink-0 sm:w-8 sm:h-8" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{t('donate.bankTransfer.title')}</h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                {t('donate.bankTransfer.description')}
              </p>
              
              {/* Bank Information */}
              <div className="space-y-4 w-full max-w-full">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full max-w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('donate.bankTransfer.bankName')}</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white break-words">{bankDetails.bankName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full max-w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('donate.bankTransfer.accountHolder')}</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white break-words">{bankDetails.accountHolder}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full max-w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('donate.bankTransfer.ribLabel')}</p>
                      <p className="text-sm sm:text-lg font-mono font-semibold text-gray-800 dark:text-white break-all">{bankDetails.rib}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.rib, 'rib')}
                      className="ml-3 p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-md transition-colors flex-shrink-0"
                      title={t('donate.bankTransfer.copyRib')}
                    >
                      {copiedField === 'rib' ? (
                        <CheckCircle size={18} className="text-green-500" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg w-full max-w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('donate.bankTransfer.ibanLabel')}</p>
                      <p className="text-sm sm:text-lg font-mono font-semibold text-gray-800 dark:text-white break-all">{bankDetails.iban}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                      className="ml-3 p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-md transition-colors flex-shrink-0"
                      title={t('donate.bankTransfer.copyIban')}
                    >
                      {copiedField === 'iban' ? (
                        <CheckCircle size={18} className="text-green-500" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
                
                
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700 w-full max-w-full">
                <div className="flex items-start w-full">
                  <CreditCard size={18} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">{t('donate.bankTransfer.importantNote')}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1 break-words">
                      {t('donate.bankTransfer.noteText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Impact Information */}
          <div className="w-full max-w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 mb-8 w-full max-w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('donate.impact.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base break-words">
                {t('donate.impact.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-500 text-white py-16 mt-16 w-full max-w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-7xl">
          <div className="max-w-3xl mx-auto">
            <Heart size={40} className="mx-auto mb-6 sm:w-12 sm:h-12" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('donate.callToAction.title')}</h2>
            <p className="text-lg sm:text-xl mb-8 break-words">
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