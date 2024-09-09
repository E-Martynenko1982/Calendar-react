import React, { useState, useEffect } from 'react';
import './redline.scss';

const RedLine = () => {
  const [linePosition, setLinePosition] = useState(0);

  const updateLinePosition = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const pixelsPerHour = 60;
    const pixelsPerMinute = pixelsPerHour / 60;

    // Позиция линии в пикселях
    const positionInPixels = currentHour * pixelsPerHour + currentMinutes * pixelsPerMinute;
    console.log('Red line position:', positionInPixels);
    setLinePosition(positionInPixels);
    console.log('Red line position:', positionInPixels)
  };

  useEffect(() => {
    updateLinePosition();
    const intervalId = setInterval(updateLinePosition, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='red-line' style={{ top: `${linePosition}px` }}></div>
  );
};

export default RedLine;

