import React from 'react';
import Day from '../day/Day';

import './week.scss';

const Week = ({ weekDates, events, deleteEvent }) => {
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
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Week;

