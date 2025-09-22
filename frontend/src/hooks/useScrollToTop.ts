import { useCallback } from 'react';

interface ScrollOptions {
  behavior?: 'smooth' | 'instant';
  delay?: number;
}

export const useScrollToTop = () => {
  const scrollToTop = useCallback((options: ScrollOptions = {}) => {
    const { behavior = 'smooth', delay = 0 } = options;

    const scroll = () => {
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
      setTimeout(scroll, delay);
    } else {
      scroll();
    }
  }, []);

  const scrollToElement = useCallback((elementId: string, options: ScrollOptions = {}) => {
    const { behavior = 'smooth', delay = 0 } = options;

    const scroll = () => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ 
          behavior: behavior === 'instant' ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    };

    if (delay > 0) {
      setTimeout(scroll, delay);
    } else {
      scroll();
    }
  }, []);

  const scrollToSection = useCallback((selector: string, options: ScrollOptions = {}) => {
    const { behavior = 'smooth', delay = 0 } = options;

    const scroll = () => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ 
          behavior: behavior === 'instant' ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    };

    if (delay > 0) {
      setTimeout(scroll, delay);
    } else {
      scroll();
    }
  }, []);

  return {
    scrollToTop,
    scrollToElement,
    scrollToSection
  };
};
