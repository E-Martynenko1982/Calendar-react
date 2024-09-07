import React from 'react';
import Hour from '../hour/Hour.jsx';
import PropTypes from 'prop-types';

import './day.scss';

const Day = ({ dataDay, dayEvents, deleteEvent, openModal }) => {
  const hours = Array(24).fill().map((val, index) => index);


  return (
    <div className="calendar__day" data-day={dataDay}>



      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            deleteEvent={deleteEvent}
            openModal={openModal}
            dataDay={dataDay}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.string.isRequired,
  dayEvents: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Day;
