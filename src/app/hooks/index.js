// hooks/useWindowSize.js
import { useState, useEffect } from 'react';
export const useSizeFormatter = size => {
  const [colors, setColors] = useState([]);
  const sizes = size.map(item => item?.size);
  size?.forEach(item => {
    const { colors: tempColors } = item;
    tempColors.forEach(color => {
      if (!colors.includes(color)) {
        setColors(prev => [...prev, color]);
      }
      // setColors(prev => (prev?.includes(color) ? prev : [...prev, color]));
    });
  });
  return { sizes, colors };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
