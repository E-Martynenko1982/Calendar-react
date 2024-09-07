import React from 'react';
import { days } from '../../utils/dateUtils.js';
import PropTypes from 'prop-types';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  const currentDate = new Date();

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const isToday =
          dayDate.getDate() === currentDate.getDate() &&
          dayDate.getMonth() === currentDate.getMonth() &&
          dayDate.getFullYear() === currentDate.getFullYear(); // is current

        return (
          <div
            key={dayDate}
            className={`calendar__day-label day-label ${isToday ? 'day-label--today' : ''
              }`}
          >
            <span className="day-label__day-name">
              {days[dayDate.getDay()]}
            </span>
            <span className="day-label__day-number">{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
}

export default Navigation;
