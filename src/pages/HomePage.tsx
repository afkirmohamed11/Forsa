import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card, { CardContent, CardMedia } from '../components/ui/Card';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-r from-primary-900 to-primary-700 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="public/about.jpg" 
            alt="Volunteers working together" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 z-10 animate-fade-in">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Forsa <span className="text-secondary-300">{t('home.slogan')}</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {t('home.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                {t('home.cta.learnMore')}
              </Button>
              <Link to="/donate">
                <Button variant="secondary" size="lg">
                  {t('home.cta.donate')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm">
                  {t('home.cta.joinUs')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Community gathering" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('home.mission.title')}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t('home.mission.description')}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('home.vision.title')}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t('home.vision.description')}
                </p>
              </div>
              <Link to="/activities" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium">
                <span className="mr-2">{t('activities.discover')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

     

      {/* Recent Activities Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('activities.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('activities.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Single activity card - matching the one in ActivitiesPage */}
            <Card hover className="h-full">
              <CardMedia 
                src="/activity1_1.jpg"
                alt="Academic and Career Guidance Sessions"
              />
              <CardContent>
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    {t('activities.filters.education')}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {t('activities.sampleActivities.guidanceSessions.date')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t('activities.sampleActivities.guidanceSessions.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('activities.sampleActivities.guidanceSessions.description')}
                </p>
                <Link to="/activities/1" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium">
                  <span className="mr-2">{t('activities.readMore')}</span>
                  <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/activities">
              <Button variant="outline" size="lg">
                {t('activities.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-secondary-400 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.callToAction.title')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('home.callToAction.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/donate">
              <Button variant="outline" size="lg" className="!bg-white !text-black !border-white hover:!bg-orange-500 hover:!text-white">
                {t('home.cta.donate')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="!bg-white !text-black !border-white hover:!bg-orange-500 hover:!text-white">
                {t('home.cta.joinUs')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;