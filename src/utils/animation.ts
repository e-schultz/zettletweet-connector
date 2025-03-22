import { useEffect, useState } from 'react';

// Utility for staggered animations
export const stagger = (delayMs = 50, index = 0) => {
  return {
    style: {
      '--animation-delay': `${index * delayMs}ms`,
    },
  };
};

// Progressive image loading
export const useProgressiveImage = (src: string, placeholder: string = '') => {
  const [sourceLoaded, setSourceLoaded] = useState(placeholder);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setSourceLoaded(src);
    };
  }, [src]);

  return sourceLoaded;
};

// Intersection observer hook for scroll animations
export const useInView = (options = {}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isInView];
};

// Page transition animation
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};
