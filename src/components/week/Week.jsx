import React from 'react';
import Day from '../day/Day';

import './week.scss';

const Week = ({ weekDates, events, deleteEvent, openModal }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(24, 0, 0, 0);

        // Получаем все события для текущего дня
        const dayEvents = events.filter(
          (event) => event.dateFrom >= dayStart && event.dateTo <= dayEnd
        );

        return (
          <Day
            key={dayStart.toISOString()}
            dataDay={dayStart.toISOString()}
            dayEvents={dayEvents}
            deleteEvent={deleteEvent}
            openModal={openModal}
          />
        );
      })}
    </div>
  );
};

export default Week;

