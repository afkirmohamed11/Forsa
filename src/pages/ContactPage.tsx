import emailjs from '@emailjs/browser';
import { AlertCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = t('contact.validation.nameRequired');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('contact.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('contact.validation.emailInvalid');
    }
    
    if (!formData.subject.trim()) {
      errors.subject = t('contact.validation.subjectRequired');
    }
    
    if (!formData.message.trim()) {
      errors.message = t('contact.validation.messageRequired');
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setError('');

      try {
        // EmailJS configuration
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const contactTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // Check if environment variables are set
        if (!serviceId || !contactTemplateId || !publicKey) {
          throw new Error('EmailJS configuration missing');
        }

        const submissionDate = new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        // Template parameters for contact form
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          submission_date: submissionDate,
          to_email: 'mohammedafk002@gmail.com'
        };

        // Send email to admin
        await emailjs.send(serviceId, contactTemplateId, templateParams, publicKey);

        // Success
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (err) {
        console.error('Contact form error:', err);
        setError(t('contact.form.error'));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Page Header */}
      <div className="bg-accent-500 text-white py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 w-full">
          {/* Contact Form */}
          <div className="order-2 lg:order-1 w-full max-w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 w-full max-w-full">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {t('contact.form.success')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('contact.form.successDescription')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full max-w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 ${
                        formErrors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full max-w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 ${
                        formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                      {t('contact.form.subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full max-w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 ${
                        formErrors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.subject && (
                      <p className="mt-1 text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.subject}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full max-w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 resize-vertical ${
                        formErrors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.message}
                      </p>
                    )}
                  </div>
                  
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
                      <p className="text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={16} className="mr-2" />
                        {error}
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : t('contact.form.submit')}
                  </Button>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="order-1 lg:order-2 space-y-6 lg:space-y-8 w-full max-w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 w-full max-w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {t('contact.info.title')}
              </h2>
              
              <ul className="space-y-6 w-full">
                <li className="flex items-start w-full">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <MapPin size={20} className="text-primary-600 dark:text-primary-400 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1 text-sm sm:text-base">{t('contact.info.address')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-words">{t('contact.info.addressValue')}</p>
                  </div>
                </li>
                
                <li className="flex items-start w-full">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <Phone size={20} className="text-primary-600 dark:text-primary-400 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1 text-sm sm:text-base">{t('contact.info.phone')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-words">{t('contact.info.phoneValue')}</p>
                  </div>
                </li>
                
                <li className="flex items-start w-full">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <Mail size={20} className="text-primary-600 dark:text-primary-400 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1 text-sm sm:text-base">{t('contact.info.email')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-words">{t('contact.info.emailValue')}</p>
                  </div>
                </li>
                
                <li className="flex items-start w-full">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <Clock size={20} className="text-primary-600 dark:text-primary-400 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1 text-sm sm:text-base">{t('contact.info.hours')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-words">{t('contact.info.hoursValue')}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Social Media */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 w-full max-w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {t('contact.social.title')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 w-full max-w-full">
                <a 
                  href="https://wa.me/212675900514" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors w-full"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base text-center">{t('contact.social.whatsapp')}</span>
                </a>
                
                <a 
                  href="https://www.facebook.com/share/1BYkzYXvqt/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors w-full"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base text-center">{t('contact.social.facebook')}</span>
                </a>
                
                <a 
                  href="https://www.instagram.com/association_forsa_trougout?igsh=MXE5OGlwajkza3Mzag%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors w-full sm:col-span-2 xl:col-span-1"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 rounded-full flex items-center justify-center mb-2 flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base text-center">{t('contact.social.instagram')}</span>
                </a>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 w-full max-w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('contact.location')}</h2>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden w-full max-w-full">
                {/* Option 1: Google Maps Embed */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.8!2d-3.7720815!3d35.1803487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd742ae9ae8b8fa9%3A0xfcde253bacd3a1ad!2sTrougout!5e0!3m2!1sen!2sma!4v1735984800000!5m2!1sen!2sma" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, maxWidth: '100%' }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
                
                {/* Option 2: OpenStreetMap (uncomment if Google Maps doesn't work) */}
                {/* 
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7749517%2C35.1803487%2C-3.7720815%2C35.1806395&layer=mapnik&marker=35.1803487%2C-3.7720815"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Office Location"
                ></iframe>
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;