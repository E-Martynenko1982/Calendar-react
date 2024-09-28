import React from 'react';
import PropTypes from 'prop-types';
import { deleteEvent as deleteEventFromServer } from '../../gateway/events.js';
import './event.scss';

const Event = ({ id, height, title, time, description, events, loadEvents }) => {

  const deleteEvent = (id) => {
    const eventToDelete = events.find(event => event.id === id);
    const currentTime = new Date();
    const time = 15 * 60 * 1000;
    const timeDiff = eventToDelete.dateFrom.getTime() - currentTime.getTime();

    if (eventToDelete) {
      if (eventToDelete.dateFrom > currentTime) {

        if (timeDiff <= time) {
          alert('Нельзя удалять событие раньше чем за 15 минут до начала.');
          return;
        }
      }
    }

    deleteEventFromServer(id)
      .then(() => {
        loadEvents();
      })
  };

  return (
    <div
      className="event-container"
    >
      <div
        style={{ height: `${height}px` }}
        className="event">
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        <div className="event__description">{description}</div>
      </div>
      <button
        className="delete-event-btn"
        onClick={() => deleteEvent(id)}
      >
        Delete
      </button>
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
