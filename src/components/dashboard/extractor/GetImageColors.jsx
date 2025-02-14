import { useEffect, useState } from 'react';
import getImageColors from 'get-image-colors';

export function GetImageColors({ src }) {
  const [color, setColor] = useState('');

  useEffect(() => {
    getImageColors(src[0]).then(colors => {
      console.log('colors', colors);
      setColor(colors[0].hex());
    });
  }, [src]);
  // return color;

  return (
    <div style={{ backgroundColor: color, width: '100px', height: '100px' }}>
      {color}
    </div>
  );
}
