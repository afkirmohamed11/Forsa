import { ArrowRight, Calendar } from 'lucide-react';
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
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-r from-primary-900 to-primary-700 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/about.jpg" 
            alt="helping each other" 
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
              <a href="#about">
                <Button variant="primary" size="lg">
                  {t('home.cta.learnMore')}
                </Button>
              </a>
              <Link to="/donate">
                <Button variant="secondary" size="lg">
                  {t('home.cta.donate')}
                </Button>
              </Link>
              <a href="#contact">
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm">
                  {t('home.cta.joinUs')}
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        
      </section>

      {/* Mission & Vision Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
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
              <div className="flex gap-4 mt-6">
                <a href="#activities" className="text-primary-500 hover:text-primary-600 font-medium">
                  {t('activities.discover')} →
                </a>
                <a href="#contact" className="text-primary-500 hover:text-primary-600 font-medium">
                  {t('activities.getInvolved.title')} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('news.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('news.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured News Article */}
            <Card hover className="h-full">
              <CardMedia 
                src="/news/news1/img1.jpg"
                alt="Academic and Career Guidance Success"
              />
              <CardContent>
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    {t('news.filters.education')}
                  </span>
                  <span className="ml-2 inline-block px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    {t('news.featured')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t('news.articles.guidanceSuccess.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('news.articles.guidanceSuccess.summary')}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{t('news.articles.guidanceSuccess.date')}</span>
                </div>
                <Link to="/news/1" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium">
                  <span className="mr-2">{t('news.readMore')}</span>
                  <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>

            {/* Second News Article */}
            <Card hover className="h-full">
              <CardMedia 
                src="/news/news2/img.webp"
                alt="Upcoming Academic Guidance Session"
              />
              <CardContent>
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    {t('news.filters.education')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t('news.articles.upcomingGuidance.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('news.articles.upcomingGuidance.summary')}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{t('news.articles.upcomingGuidance.date')}</span>
                </div>
                <Link to="/news/2" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium">
                  <span className="mr-2">{t('news.readMore')}</span>
                  <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>

            {/* Call-to-action Card */}
            <Card className="h-full bg-gradient-to-br from-accent-500 to-accent-600 text-white">
              <CardContent className="h-full flex flex-col justify-center items-center text-center p-8">
                <h3 className="text-2xl font-bold mb-4">{t('news.newsletter.title')}</h3>
                <p className="text-accent-100 mb-6">
                  {t('news.newsletter.description')}
                </p>
                <Link to="/news">
                  <Button variant="outline" size="lg" className="!bg-white !text-accent-600 !border-white hover:!bg-accent-50">
                    {t('news.viewAll')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activities Section */}
      <section id="activities" className="py-20 bg-gray-50 dark:bg-gray-900">
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
                src="/activities/activity1/activity1_1.jpg"
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

      {/* Our Impact Section - Commented out for now */}
      {/* 
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.impact.title')}</h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              {t('home.impact.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg font-semibold text-orange-100">{t('home.impact.projects')}</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
              <div className="text-lg font-semibold text-orange-100">{t('home.impact.communities')}</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-lg font-semibold text-orange-100">{t('home.impact.volunteers')}</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">5000+</div>
              <div className="text-lg font-semibold text-orange-100">{t('home.impact.beneficiaries')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Section */}
      <div className="h-16 bg-white dark:bg-gray-900"></div>

      {/* CTA Section */}
      <section id="contact" className="relative py-24 bg-gradient-to-r from-secondary-400 to-secondary-600 text-white">
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