import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopInstant = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTopInstant;
