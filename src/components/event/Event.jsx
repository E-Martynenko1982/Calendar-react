import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteButton from '../hour/DeleteButton';
import './event.scss';

const Event = ({ id, height, marginTop, title, time, description, deleteEvent }) => {
  const [isHovered, setIsHovered] = useState(false);

  const eventStyle = {
    height: `${height}px`,
    marginTop: `${marginTop}px`,
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!document.querySelector('.delete-event-btn:hover')) {
        setIsHovered(false);
      }
    }, 100);
  };

  return (
    <div
      className="event-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={eventStyle} className="event"

      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        <div className="event__description">{description}</div>
      </div>

      {/* Кнопка остается видимой при перемещении курсора на неё */}
      {isHovered && (
        <DeleteButton
          onClick={() => deleteEvent(id)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
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

