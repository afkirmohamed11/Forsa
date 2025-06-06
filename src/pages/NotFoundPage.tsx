import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <Search size={64} className="mx-auto text-primary-500" />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
          {t('notFound.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('notFound.description')}
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" className="inline-flex items-center">
            <Home size={18} className="mr-2" />
            {t('notFound.button')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;