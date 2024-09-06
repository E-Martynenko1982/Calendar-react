import React from 'react';
import './header.scss';
import { shortMonths } from '../../utils/dateUtils.js'; // Массив с названиями месяцев

const Header = ({ goToNextWeek, goToPreviousWeek, goToCurrentWeek, weekDates, openModal }) => {
  const uniqueMonths = [...new Set(weekDates.map(day => shortMonths[day.getMonth()]))];

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={openModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={goToCurrentWeek}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={goToPreviousWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={goToNextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {uniqueMonths.length === 1
            ? uniqueMonths[0]
            : `${uniqueMonths[0]} - ${uniqueMonths[1]}`}
        </span>
      </div>
    </header>
  );
};

export default Header;


