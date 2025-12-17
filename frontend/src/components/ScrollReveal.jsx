import { useRef, useEffect, useState } from 'react';

const ScrollReveal = ({ children, className = "", mode = "fade-up", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            // Add a small delay if content is loading or just for effect
          setTimeout(() => {
               setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, 
        rootMargin: "50px", 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getTransformClass = () => {
      switch (mode) {
          case 'fade-up': return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";
          case 'fade-in': return isVisible ? "opacity-100" : "opacity-0";
          case 'slide-right': return isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"; // Enter FROM left
          case 'slide-left': return isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"; // Enter FROM right
          case 'zoom-in': return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
          default: return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";
      }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
