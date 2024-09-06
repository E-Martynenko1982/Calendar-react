import React, { useState } from 'react';

import './event.scss';

const Event = ({ id, height, marginTop, title, time, deleteEvent }) => {
  const [isHovered, setIsHovered] = useState(false);

  const eventStyle = {
    height: `${height}px`,
    marginTop: `${marginTop}px`,
  };

  return (
    <div
      style={eventStyle}
      className="event"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isHovered && (
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

export default Event;

