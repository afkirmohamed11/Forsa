import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

const partners = [
  {
    id: 1,
    nameKey: 'collaborations.partners.educationMinistry',
    logo: 'https://images.pexels.com/photos/4792288/pexels-photo-4792288.jpeg?auto=compress&cs=tinysrgb&w=1600&h=750&dpr=1',
    category: 'government'
  }
];


const CollaborationsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-accent-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('collaborations.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t('collaborations.subtitle')}
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('collaborations.description')}
          </p>
        </div>
        
        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img 
                  src={partner.logo} 
                  alt={t(partner.nameKey)} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t(partner.nameKey)}</h3>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full">
                {partner.category === 'ngo' ? t('collaborations.partnerTypes.ngo') : 
                 partner.category === 'government' ? t('collaborations.partnerTypes.government') : 
                 partner.category === 'corporate' ? t('collaborations.partnerTypes.business') : t('collaborations.partnerTypes.educational')}
              </span>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <a
        href="https://wa.me/212675900514"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-center mb-24">
          <Button variant="primary" size="lg">
            {t('collaborations.becomePartner')}
          </Button>
        </div></a>
        
        

        
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-500 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t('collaborations.callToAction.title')}</h2>
            <p className="text-xl mb-8">
              {t('collaborations.callToAction.description')}
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100"
            >
              {t('collaborations.callToAction.button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationsPage;