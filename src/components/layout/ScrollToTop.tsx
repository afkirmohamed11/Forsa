import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    // Use a small delay to ensure the component has rendered
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use instant for page navigation to avoid conflicts with smooth scrolling
      });
    };

    // Small timeout to ensure DOM is ready
    setTimeout(scrollToTop, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
