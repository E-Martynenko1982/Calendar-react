import React from 'react';
import PropTypes from "prop-types";
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import RedLine from '../red-line/RedLine';
import './calendar.scss';

const Calendar = ({ dataDay, weekDates, events, deleteEvent, openModal }) => {
  const isToday = new Date(dataDay).toDateString() === new Date().toDateString();

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          {isToday && <RedLine />}
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

