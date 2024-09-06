import React from 'react';
import Hour from '../hour/Hour';

import './day.scss';

const Day = ({ dataDay, dayEvents, deleteEvent, openModal }) => {
  const hours = Array(24).fill().map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        // Получаем все события, начинающиеся в текущий час
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            deleteEvent={deleteEvent}
            openModal={openModal}
          />
        );
      })}
    </div>
  );
};

export default Day;

