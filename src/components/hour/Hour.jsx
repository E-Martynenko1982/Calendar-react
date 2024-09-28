import React from 'react';
import Event from '../event/Event';
import PropTypes from 'prop-types';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, hourEvents, dataDay, openModal, loadEvents }) => {
  const handleTimeSlotClick = () => {
    if (hourEvents.length > 0) {
      return;
    }

    const selectedTimeSlot = new Date(dataDay);
    selectedTimeSlot.setHours(dataHour, 0, 0, 0);

    // Validation moved to handleTimeSlotClick
    const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());
    const timeToUse = isValidDate(selectedTimeSlot) ? selectedTimeSlot : new Date();

    openModal(timeToUse);
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
            events={hourEvents}
            description={description}
            loadEvents={loadEvents}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  dataDay: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
};

export default Hour;
