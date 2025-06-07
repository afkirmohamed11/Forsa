import emailjs from '@emailjs/browser';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card, { CardContent, CardMedia } from '../components/ui/Card';

const NewsPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const welcomeTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_WELCOME;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if environment variables are set
      if (!serviceId || !welcomeTemplateId || !publicKey) {
        throw new Error('EmailJS configuration missing');
      }

      const subscriptionDate = new Date().toLocaleString('ar-MA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Template parameters for welcome email
      const templateParams = {
        subscriber_email: email,
        subscription_date: subscriptionDate
      };

      // Send welcome email to subscriber
      await emailjs.send(serviceId, welcomeTemplateId, templateParams, publicKey);

      // Success
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (err) {
      console.error('Subscription error:', err);
      setError(t('footer.subscribe.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const newsArticles = [
    {
      id: 1,
      titleKey: 'news.articles.guidanceSuccess.title',
      summaryKey: 'news.articles.guidanceSuccess.summary',
      contentKey: 'news.articles.guidanceSuccess.content',
      date: t('news.articles.guidanceSuccess.date'),
      readTime: t('news.articles.guidanceSuccess.readTime'),
      category: 'education',
      image: '/news/news1/img1.jpg',
      featured: true,
      dateSort: '2025-05-25'
    },    {
      id: 2,
      titleKey: 'news.articles.upcomingGuidance.title',
      summaryKey: 'news.articles.upcomingGuidance.summary',
      contentKey: 'news.articles.upcomingGuidance.content',
      date: t('news.articles.upcomingGuidance.date'),
      readTime: t('news.articles.upcomingGuidance.readTime'),
      category: 'education',
      image: '/news/news2/img.webp',
      featured: false,
      dateSort: '2025-05-15'
    }
  ].sort((a, b) => new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime());

  const filteredNews = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const categories = [
    { value: 'all', label: t('news.filters.all') },
    { value: 'education', label: t('news.filters.education') },
    { value: 'activities', label: t('news.filters.activities') },
    { value: 'partnerships', label: t('news.filters.partnerships') }
  ];

  const categoryColors = {
    education: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    activities: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    partnerships: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-accent-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('news.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t('news.subtitle')}
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

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <Card key={article.id} hover className="h-full animate-slide-up transition-transform hover:scale-105">
              <Link to={`/news/${article.id}`} className="block">
                <CardMedia 
                  src={article.image}
                  alt={t(article.titleKey)}
                />
              </Link>
                
              <CardContent>
                <div className="mb-2">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${categoryColors[article.category as keyof typeof categoryColors]}`}>
                    {categories.find(cat => cat.value === article.category)?.label}
                  </span>
                  {article.featured && (
                    <span className="ml-2 inline-block px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      {t('news.featured')}
                    </span>
                  )}
                </div>
                <Link to={`/news/${article.id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-primary-500 transition-colors">
                    {t(article.titleKey)}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(article.summaryKey)}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                  <Calendar size={16} className="mr-2" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                  <Clock size={16} className="mr-2" />
                  <span>{article.readTime}</span>
                </div>
                
                {/* Read More button */}
                <Link to={`/news/${article.id}`}>
                  <Button variant="outline" size="sm" fullWidth>
                    <span className="mr-2">{t('news.readMore')}</span>
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-300">{t('news.noNews')}</p>
          </div>
        )}
      </div>      {/* Newsletter CTA Section */}
      <div className="bg-primary-500 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t('news.newsletter.title')}</h2>
            <p className="text-xl mb-8">
              {t('news.newsletter.description')}
            </p>
            <div className="max-w-md mx-auto">
              {isSubscribed ? (
                <p className="text-green-100 text-lg">{t('footer.subscribe.success')}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex gap-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('news.newsletter.placeholder')}
                      className="flex-1 px-4 py-3 rounded-l border-r border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/20"
                      required
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit"
                      variant="secondary" 
                      disabled={isLoading}
                      className="!bg-white !text-primary-500 hover:!bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg active:shadow-md rounded-l-none border-l border-gray-200 disabled:!bg-gray-200 disabled:!text-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? '...' : t('news.newsletter.subscribe')}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-red-200 text-sm mt-2">{error}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
