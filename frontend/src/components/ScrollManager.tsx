import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollManagerProps {
  behavior?: 'smooth' | 'instant';
  delay?: number;
  enabled?: boolean;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ 
  behavior = 'smooth', 
  delay = 100,
  enabled = true 
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!enabled) return;

    const scrollToTop = () => {
      if (behavior === 'instant') {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    };

    if (delay > 0) {
      const timer = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timer);
    } else {
      scrollToTop();
    }
  }, [pathname, behavior, delay, enabled]);

  return null;
};

export default ScrollManager;
