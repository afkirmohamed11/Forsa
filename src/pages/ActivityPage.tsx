import { ArrowLeft, Facebook, Share2, Tag } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card, { CardMedia } from '../components/ui/Card';

const ActivityPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  // Mock data - In a real app, this would come from an API
  const getActivityData = (activityId: string) => {
    switch (activityId) {
      case '1':
        return {
          id: 1,
          title: t('activities.sampleActivities.guidanceSessions.title'),
          description: t('activities.sampleActivities.guidanceSessions.description'),
          detailedDescription: t('activities.sampleActivities.guidanceSessions.detailedDescription'),
          date: t('activities.sampleActivities.guidanceSessions.date'),
          location: t('activities.sampleActivities.guidanceSessions.location'),
          category: 'education',
          facebookUrl: 'https://www.facebook.com/share/p/1DneHGCzpB/',
          tags: [t('activities.filters.education'), t('activities.tagLabels.youth'), t('activities.tagLabels.communitySupport')],
          gallery: [
            '/activities/activity1/activity1_1.jpg',
            '/activities/activity1/activity1_2.jpg',
            '/activities/activity1/activity1_3.jpg',
            '/activities/activity1/activity1_4.jpg',
            '/activities/activity1/activity1_5.jpg',
            '/activities/activity1/activity1_6.jpg'
          ],
          impact: {
            beneficiaries: 60,
            volunteers: 3,
            partners: 2
          }
        };       
      default:
        return null;
    }
  };

  const activity = getActivityData(id || '1');

  if (!activity) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('notFound.description')}
          </p>
          <Link to="/activities">
            <Button variant="primary">
              {t('activities.backToActivities')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const text = `Check out ${activity.title} by Forsa Association!`;
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-primary-500 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/activities" className="inline-flex items-center text-white hover:text-white/80 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            {t('activities.backToActivities')}
          </Link>
          <h1 className="text-4xl font-bold mb-4">{activity.title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-white/80">{activity.date}</span>
            <span className="text-white/80">{activity.location}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t('activities.gallery')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Main large image */}
                <div className="col-span-2 md:col-span-2">
                  <CardMedia
                    src={activity.gallery[0]}
                    alt={activity.title}
                    aspectRatio="wide"
                    className="rounded-lg"
                  />
                </div>
                {/* Side image */}
                <div className="col-span-2 md:col-span-1">
                  <CardMedia
                    src={activity.gallery[1]}
                    alt={`${activity.title} - Image 2`}
                    aspectRatio="square"
                    className="rounded-lg"
                  />
                </div>
                {/* Bottom row images */}
                {activity.gallery.slice(2).map((image, index) => (
                  <CardMedia
                    key={index}
                    src={image}
                    alt={`${activity.title} - Image ${index + 3}`}
                    aspectRatio="square"
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 whitespace-pre-line">
                {activity.detailedDescription}
              </div>
            </div>

            {/* Impact */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <Card>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {activity.impact.beneficiaries}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">{t('activities.beneficiaries')}</div>
                </div>
              </Card>
              <Card>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {activity.impact.volunteers}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">{t('activities.volunteers')}</div>
                </div>
              </Card>
              <Card>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {activity.impact.partners}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">{t('activities.partners')}</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <div className="p-6">
                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {t('activities.tags')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                      >
                        <Tag size={14} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {t('activities.share')}
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      onClick={handleShare}
                      className="flex items-center justify-center"
                    >
                      <Share2 size={20} className="mr-2" />
                      {t('activities.shareWhatsApp')}
                    </Button>
                    {activity.facebookUrl && (
                      <a 
                        href={activity.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          className="flex items-center justify-center"
                        >
                          <Facebook size={20} className="mr-2" />
                          {t('activities.seeOnFacebook')}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;