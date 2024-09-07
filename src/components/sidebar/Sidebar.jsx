import React, { useEffect, useState } from 'react';

import './sidebar.scss';

const Sidebar = () => {
  const [linePosition, setLinePosition] = useState(0);

  // Функция для обновления позиции линии
  const updateLinePosition = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Высота одного часа в пикселях
    const pixelsPerHour = 60; // 60px для каждого часа
    const pixelsPerMinute = pixelsPerHour / 60; // 1px для каждой минуты

    // Вычисляем позицию линии
    const positionInPixels = currentHour * pixelsPerHour + currentMinutes * pixelsPerMinute;

    setLinePosition(positionInPixels);
  };

  useEffect(() => {
    // Обновляем позицию красной линии каждые 60 секунд
    const intervalId = setInterval(updateLinePosition, 60000);
    // Устанавливаем начальное положение
    updateLinePosition();

    // Чистим интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="calendar__time-scale">
      <div
        className="red-line"
        style={{ top: `${linePosition}px` }}
      ></div>
      {Array(24)
        .fill()
        .map((val, index) => (
          <div key={index} className="time-slot">
            <span className="time-slot__time">{`${index}:00`}</span>
          </div>
        ))}
    </div>
  );
};

export default Sidebar;

