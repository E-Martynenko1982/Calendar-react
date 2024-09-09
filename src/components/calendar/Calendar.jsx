import React from 'react';
import PropTypes from "prop-types";
import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week';
<<<<<<< HEAD
import Sidebar from '../sidebar/Sidebar.jsx';
import RedLine from '../red-line/RedLine.jsx';
=======
import Sidebar from '../sidebar/Sidebar';

>>>>>>> c858e862a27f44465b364bd93f85c6398dd9b9af
import './calendar.scss';

const Calendar = ({ weekDates, events, deleteEvent, openModal }) => {


  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">

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

