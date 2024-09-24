import React from 'react';
import Day from '../day/Day';

import './week.scss';

const Week = ({ weekDates, events, loadEvents, openModal }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(24, 0, 0, 0);

        // all events
        const dayEvents = events.filter(
          (event) => event.dateFrom >= dayStart && event.dateTo <= dayEnd
        );

        return (
          <Day
            key={dayStart.toISOString()}
            dataDay={dayStart.toISOString()}
            dayEvents={dayEvents}
            loadEvents={loadEvents}
            openModal={openModal}
          />
        );
      })}
    </div>
  );
};

export default Week;

