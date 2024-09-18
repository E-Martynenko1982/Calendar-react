import React from 'react';
import Event from '../event/Event';
import PropTypes from 'prop-types';
import { formatMins } from '../../../src/utils/dateUtils.js';
import './hour.scss';

const Hour = ({ dataHour, hourEvents, deleteEvent, dataDay, openModal }) => {
  const handleTimeSlotClick = () => {
    if (hourEvents.length > 0) {
      return;
    }

    const selectedTimeSlot = new Date(dataDay);
    selectedTimeSlot.setHours(dataHour, 0, 0, 0);
    openModal(selectedTimeSlot);
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleTimeSlotClick}>
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  dataDay: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Hour;


