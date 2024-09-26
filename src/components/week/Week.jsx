import React from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';
import './week.scss';

const Week = ({ weekDates, events, loadEvents, openModal }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(24, 0, 0, 0);
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

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  loadEvents: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
}
export default Week;

