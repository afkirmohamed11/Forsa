import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageChange = (lang: 'en' | 'fr' | 'ar') => {
    changeLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/activities', label: t('nav.activities') },
    { to: '/donate', label: t('nav.donate') },
    { to: '/collaborations', label: t('nav.collaborations') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-gray-800 shadow-md py-2' : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
     <Link to="/" className="flex items-center">
      <img src="/forsa.png" alt="Forsa Logo" className="h-8 w-auto" />
      <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
        Forsa
      </span>
    </Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium hover:text-primary-500 transition-colors ${
                  location.pathname === link.to 
                    ? 'text-primary-500 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-1 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                <Globe size={20} />
                <span>{language.toUpperCase()}</span>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 animate-fade-in">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code as 'en' | 'fr' | 'ar')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === option.code 
                          ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full text-gray-700 dark:text-gray-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 focus:outline-none text-gray-700 dark:text-gray-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-3 px-4 font-medium ${
                  location.pathname === link.to 
                    ? 'text-primary-500 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language options in mobile menu */}
            <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700 mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Language</p>
              <div className="flex space-x-4">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => handleLanguageChange(option.code as 'en' | 'fr' | 'ar')}
                    className={`text-sm py-1 px-2 rounded ${
                      language === option.code 
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;