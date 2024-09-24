import React from 'react';
import PropTypes from "prop-types";
import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar.jsx';

import './calendar.scss';

const Calendar = ({ weekDates, events, loadEvents, openModal }) => {

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">

          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            loadEvents={loadEvents}
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
  loadEvents: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Calendar;

