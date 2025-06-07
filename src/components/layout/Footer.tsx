import emailjs from '@emailjs/browser';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
                  <img src="/forsa.png" alt="Forsa Logo" className="h-8 w-auto" />
                  <span className="ml-2 text-xl font-bold text-white">
                    Forsa
                  </span>
                </Link>
            <p className="text-gray-300 text-sm">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/212675900514" aria-label="WhatsApp" className="text-gray-300 hover:text-primary-500 transition-colors">
                <span className="sr-only">WhatsApp</span>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1BYkzYXvqt/?mibextid=wwXIfr" aria-label="Facebook" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/association_forsa_trougout?igsh=MXE5OGlwajkza3Mzag%3D%3D&utm_source=qr" aria-label="Instagram" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.links')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary-500 transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/activities" className="text-gray-300 hover:text-primary-500 transition-colors">{t('nav.activities')}</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-primary-500 transition-colors">{t('nav.news')}</Link></li>
              <li><Link to="/donate" className="text-gray-300 hover:text-primary-500 transition-colors">{t('nav.donate')}</Link></li>
              <li><Link to="/collaborations" className="text-gray-300 hover:text-primary-500 transition-colors">{t('nav.collaborations')}</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary-500 transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact.info.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{t('contact.info.addressValue')}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-300">{t('contact.info.phoneValue')}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-300">{t('contact.info.emailValue')}</span>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-300">{t('contact.info.hoursShort')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.subscribe.title')}</h3>
            {isSubscribed ? (
              <p className="text-green-400">{t('footer.subscribe.success')}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.subscribe.placeholder')}
                    className="px-4 py-2 rounded-l text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-2 rounded-r text-white font-medium transition-colors"
                  >
                    {isLoading ? '...' : t('footer.subscribe.button')}
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">
            {t('footer.copyright')}
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;