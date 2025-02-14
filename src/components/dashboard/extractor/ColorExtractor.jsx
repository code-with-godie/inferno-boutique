'use client';
import { useEffect, useState } from 'react';
import Vibrant from 'node-vibrant';

const ColorExtractor = ({ src }) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    Vibrant.from(src)
      .getPalette()
      .then(palette => {
        const dominantColor = palette.Vibrant.hex();
        setColor(dominantColor);
      });
  }, [src]);

  return (
    <div style={{ backgroundColor: color, width: '100px', height: '100px' }}>
      {color}
    </div>
  );
};
export default ColorExtractor;
