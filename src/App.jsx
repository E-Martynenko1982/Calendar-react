import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { fetchEvents } from './gateway/events';
import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [events, setEvents] = useState([]);

  const loadEvents = () => {
    fetchEvents().then((fetchedEvents) => {
      setEvents(fetchedEvents);
    });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));



  const openModal = (timeSlot = null) => {
    const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());
    const currentTime = new Date();
    const timeToUse = isValidDate(timeSlot) ? timeSlot : currentTime;
    setSelectedTimeSlot(timeToUse);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        weekDates={weekDates}
        openModal={openModal}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        openModal={openModal}
        loadEvents={loadEvents}
      />
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          selectedTimeSlot={selectedTimeSlot}
          events={events}
          loadEvents={loadEvents}
        />
      )}
    </>
  );
};

export default App;


