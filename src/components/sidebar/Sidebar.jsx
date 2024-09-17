import React from 'react';
import './sidebar.scss';
const Sidebar = () => {

  return (
    <div className="calendar__time-scale">
      {Array(24)
        .fill()
        .map((val, index) => (
          <div key={index} className="time-slot">
            <span className="time-slot__time">{`${index}:00`}</span>
          </div>
        ))}
    </div>
  );
};

export default Sidebar;

