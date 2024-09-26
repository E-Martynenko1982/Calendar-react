import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createEvent } from '../../gateway/events';
import { roundToNearest15, validateEvent } from '../../utils/dateUtils';
import './modal.scss';

const Modal = ({ closeModal, selectedTimeSlot, events, loadEvents }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });



  useEffect(() => {
    const initializeEventData = (time) => {
      const startTime = roundToNearest15(time);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

      setEventData((prevData) => ({
        ...prevData,
        date: startTime.toISOString().split('T')[0],
        startTime: startTime.toTimeString().slice(0, 5),
        endTime: endTime.toTimeString().slice(0, 5),
      }));
    };

    if (selectedTimeSlot && !isNaN(new Date(selectedTimeSlot).getTime())) {
      initializeEventData(new Date(selectedTimeSlot));
    } else {
      initializeEventData(new Date());
    }
  }, [selectedTimeSlot]);



  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    const [hours, minutes] = value.split(':').map(Number);
    const newTime = new Date();
    newTime.setHours(hours, minutes);

    const roundedTime = roundToNearest15(newTime);

    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: roundedTime.toTimeString().slice(0, 5),
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const eventStart = new Date(`${eventData.date}T${eventData.startTime}`);
    const eventEnd = new Date(`${eventData.date}T${eventData.endTime}`);

    if (validateEvent(eventStart, eventEnd, events)) {
      const newEvent = {
        title: eventData.title,
        dateFrom: eventStart,
        dateTo: eventEnd,
        description: eventData.description,
      };

      createEvent(newEvent)
        .then(() => {
          closeModal();
          loadEvents();
        })
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeModal}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field-title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={eventData.date}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={eventData.startTime}
                onChange={handleTimeChange}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={eventData.endTime}
                onChange={handleTimeChange}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={eventData.description}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  selectedTimeSlot: PropTypes.instanceOf(Date),
  events: PropTypes.array.isRequired,
  loadEvents: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  selectedTimeSlot: null,
};

export default Modal;
