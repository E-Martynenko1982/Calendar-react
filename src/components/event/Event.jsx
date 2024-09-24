import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteEvent as deleteEventFromServer } from '../../gateway/events.js';
import './event.scss';

const Event = ({ id, height, title, time, description, events, loadEvents }) => {
  const [isHovered, setIsHovered] = useState(false);

  const eventStyle = {
    height: `${height}px`,
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

  const deleteEvent = (id) => {
    const eventToDelete = events.find(event => event.id === id);
    const currentTime = new Date();

    if (eventToDelete) {
      if (eventToDelete.dateFrom > currentTime) {
        const timeDiff = eventToDelete.dateFrom.getTime() - currentTime.getTime();
        if (timeDiff <= 15 * 60 * 1000) {
          alert('Нельзя удалять событие раньше чем за 15 минут до начала.');
          return;
        }
      }
    }

    deleteEventFromServer(id)
      .then(() => {
        loadEvents(); // Reload the events after deletion
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div
      className="event-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={eventStyle} className="event">
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        <div className="event__description">{description}</div>
      </div>

      {isHovered && (
        <button
          className="delete-event-btn"
          onClick={() => deleteEvent(id)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  loadEvents: PropTypes.func.isRequired,
};

export default Event;
