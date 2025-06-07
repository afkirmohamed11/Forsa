import { ArrowRight, Calendar, Facebook, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card, { CardContent, CardMedia } from '../components/ui/Card';

// Mock data for activities
const ActivitiesPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const activities = [
    {
      id: 1,
      title: t('activities.sampleActivities.guidanceSessions.title'),
      description: t('activities.sampleActivities.guidanceSessions.description'),
      date: t('activities.sampleActivities.guidanceSessions.date'),
      location: t('activities.sampleActivities.guidanceSessions.location'),
      category: 'education',
      image: '/activity1_1.jpg',
      facebookUrl: 'https://www.facebook.com/share/p/1DneHGCzpB/',
      images: [
        '/activity1_1.jpg',
        '/activity1_2.jpg',
        '/activity1_3.jpg',
        '/activity1_4.jpg',
        '/activity1_5.jpg',
        '/activity1_6.jpg'
      ]
    }
  ];
  
  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  const categories = [
    { value: 'all', label: t('activities.filters.all') },
    { value: 'education', label: t('activities.filters.education') },
    { value: 'health', label: t('activities.filters.health') },
    { value: 'environment', label: t('activities.filters.environment') }
    
  ];

  const categoryColors = {
    education: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    environment: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  };

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-primary-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('activities.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t('activities.subtitle')}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} hover className="h-full animate-slide-up transition-transform hover:scale-105">
              {/* Image Gallery */}
              <Link to={`/activities/${activity.id}`} className="block">
                <div className="relative">
                  <CardMedia 
                    src={activity.image}
                    alt={activity.title}
                  />
                  {activity.images && activity.images.length > 1 && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                      +{activity.images.length - 1} more
                    </div>
                  )}
                </div>
                
                {/* Additional images preview */}
                {activity.images && activity.images.length > 1 && (
                  <div className="p-2 bg-gray-50 dark:bg-gray-700">
                    <div className="flex gap-1 overflow-x-auto">
                      {activity.images.slice(1, 4).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${activity.title} ${index + 2}`}
                          className="w-12 h-12 object-cover rounded flex-shrink-0"
                        />
                      ))}
                      {activity.images.length > 4 && (
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 flex-shrink-0">
                          +{activity.images.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Link>
                
              <CardContent>
                <div className="mb-2">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${categoryColors[activity.category as keyof typeof categoryColors]}`}>
                    {categories.find(cat => cat.value === activity.category)?.label}
                  </span>
                </div>
                <Link to={`/activities/${activity.id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-primary-500 transition-colors">
                    {activity.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {activity.description}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                  <Calendar size={16} className="mr-2" />
                  <span>{activity.date}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span>{activity.location}</span>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2">
                  <Link to={`/activities/${activity.id}`} className="flex-1">
                    <Button variant="outline" size="sm" fullWidth>
                      <span className="mr-2">{t('activities.readMore')}</span>
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                  {activity.facebookUrl && (
                    <a 
                      href={activity.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="primary" size="sm" fullWidth>
                        <Facebook size={16} className="mr-2" />
                        {t('activities.seeOnFacebook')}
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-300">{t('activities.noActivities')}</p>
          </div>
        )}
      </div>

      {/* Get Involved Section */}
      <div className="bg-gray-100 dark:bg-gray-800 mt-20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('activities.getInvolved.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t('activities.getInvolved.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
                       <a
            href="https://wa.me/212675900514"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg">
              {t('activities.getInvolved.volunteerBtn')}
            </Button>
          </a>
          <a
            href="https://wa.me/212675900514"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              {t('activities.getInvolved.suggestBtn')}
            </Button>
          </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;