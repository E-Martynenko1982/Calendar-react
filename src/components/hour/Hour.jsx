import React from 'react';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, hourEvents, deleteEvent, dataDay, openModal }) => {
  const handleTimeSlotClick = () => {
    const selectedTimeSlot = new Date(dataDay);
    selectedTimeSlot.setHours(dataHour, 0, 0, 0);
    openModal(selectedTimeSlot); // Передаем выбранное время
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleTimeSlotClick}>
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)} // Высота события в минутах
            marginTop={dateFrom.getMinutes()} // Отступ сверху в зависимости от времени начала
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Hour;
