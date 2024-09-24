import React from 'react';
import Hour from '../hour/Hour.jsx';
import RedLine from '../red-line/RedLine.jsx';
import PropTypes from 'prop-types';



const Day = ({ dataDay, dayEvents, openModal, loadEvents }) => {
  const hours = Array(24).fill().map((_, index) => index);

  const isToday = new Date(dataDay).toDateString() === new Date().toDateString();
  return (
    <div className="calendar__day" data-day={dataDay}>
      {isToday && <RedLine />}
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            openModal={openModal}
            dataDay={dataDay}
            loadEvents={loadEvents}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.string.isRequired,
  dayEvents: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
};

export default Day;

