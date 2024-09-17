import React, { useState, useEffect } from 'react';
import './redline.scss';

const RedLine = () => {

  const [linePosition, setLinePosition] = useState(0);

  const updateLinePosition = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const pixelsPerHour = 60; // 1 час = 60 пикселей
    const pixelsPerMinute = pixelsPerHour / 60; // 1 минута = 1 пиксель

    const positionInPixels = currentHour * pixelsPerHour + currentMinutes * pixelsPerMinute;
    setLinePosition(positionInPixels);
  };

  useEffect(() => {
    updateLinePosition();
    const intervalId = setInterval(updateLinePosition, 60000); // Обновляем каждую минуту

    return () => clearInterval(intervalId); // Очищаем интервал при размонтировании
  }, []);

  return (
    <div className='red-line' style={{ top: `${linePosition}px` }}></div>
  );
};

export default RedLine;


