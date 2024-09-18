import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './event.scss';

const Event = ({ id, height, marginTop, title, time, description, deleteEvent }) => {
  const [isVisible, setIsVisible] = useState(false);

  const eventStyle = {
    height: `${height}px`,
    marginTop: `${marginTop}px`,
  };

  return (
    <div
      style={eventStyle}
      className="event"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>
      {isVisible && (
        <button
          className="delete-event-btn"
          onClick={() => deleteEvent(id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default Event;
