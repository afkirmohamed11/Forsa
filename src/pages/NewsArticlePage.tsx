import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card, { CardMedia } from '../components/ui/Card';

const NewsArticlePage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  // Mock data - In a real app, this would come from an API
  const getNewsArticleData = (articleId: string) => {
    switch (articleId) {
      case '1':
        return {
          id: 1,
          title: t('news.articles.guidanceSuccess.title'),
          summary: t('news.articles.guidanceSuccess.summary'),
          content: t('news.articles.guidanceSuccess.content'),
          date: t('news.articles.guidanceSuccess.date'),
          readTime: t('news.articles.guidanceSuccess.readTime'),
          category: 'education',
          image: '/news/news1/img1.jpg',
          tags: [t('news.tags.education'), t('news.tags.youth'), t('news.tags.guidance'), t('news.tags.community')],
          gallery: [
            '/news/news1/img1.jpg',
            '/news/news1/img2.jpg',
            '/news/news1/img3.jpg',
            '/news/news1/img4.jpg'
          ],
          relatedActivity: {
            id: 1,
            title: t('activities.sampleActivities.guidanceSessions.title')
          }
        };      case '2':
        return {
          id: 2,
          title: t('news.articles.upcomingGuidance.title'),
          summary: t('news.articles.upcomingGuidance.summary'),
          content: t('news.articles.upcomingGuidance.content'),
          date: t('news.articles.upcomingGuidance.date'),
          readTime: t('news.articles.upcomingGuidance.readTime'),
          category: 'education',
          image: '/news/news2/img.webp',
          tags: [t('news.tags.education'), t('news.tags.youth'), t('news.tags.guidance')],
          gallery: [
            '/news/news2/img.webp'
          ]
        };
      default:
        return null;
    }
  };

  const article = getNewsArticleData(id || '1');

  if (!article) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('news.articleNotFound')}
          </p>
          <Link to="/news">
            <Button variant="primary">
              {t('news.backToNews')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const text = `${t('news.shareText')} ${article.title}`;
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="bg-accent-500 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/news" className="inline-flex items-center text-white hover:text-white/80 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            {t('news.backToNews')}
          </Link>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-white/80 flex items-center">
              <Calendar size={16} className="mr-2" />
              {article.date}
            </span>
            <span className="text-white/80 flex items-center">
              <Clock size={16} className="mr-2" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="mb-8">
              <CardMedia
                src={article.image}
                alt={article.title}
                aspectRatio="wide"
                className="rounded-lg"
              />
            </div>

            {/* Summary */}
            <div className="mb-6">
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none">
              <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>

            {/* Gallery */}
            {article.gallery && article.gallery.length > 1 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {t('news.gallery')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {article.gallery.slice(1).map((image, index) => (
                    <CardMedia
                      key={index}
                      src={image}
                      alt={`${article.title} - Image ${index + 2}`}
                      aspectRatio="square"
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Related Activity */}
            {article.relatedActivity && (
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {t('news.relatedActivity')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('news.relatedActivityDescription')}
                </p>
                <Link to={`/activities/${article.relatedActivity.id}`}>
                  <Button variant="outline" size="sm">
                    {t('news.viewActivity')} "{article.relatedActivity.title}"
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <div className="p-6">
                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {t('news.tags.title')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
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
                    {t('news.share')}
                  </h3>
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={handleShare}
                    className="flex items-center justify-center"
                  >
                    <Share2 size={20} className="mr-2" />
                    {t('news.shareWhatsApp')}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;
