import React from 'react';
import PropTypes from "prop-types";
import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar.jsx';
//import RedLine from '../red-line/RedLine.jsx';

import './calendar.scss';

const Calendar = ({ weekDates, events, deleteEvent, openModal }) => {
  // const isToday = (dateArray) => {
  //   const today = new Date();
  //   return dateArray.some(date =>
  //     date.getDate() === today.getDate() &&
  //     date.getMonth() === today.getMonth() &&
  //     date.getFullYear() === today.getFullYear()
  //   );
  // };
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          {/* {isToday(weekDates) && <RedLine />} */}
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            deleteEvent={deleteEvent}
            openModal={openModal}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Calendar;

