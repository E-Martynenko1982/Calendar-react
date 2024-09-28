import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { fetchEvents } from './gateway/events';
import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [modal, setModal] = useState({ isOpen: false, startTime: null });
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

  // Simplified openModal function
  const openModal = (timeSlot) => {
    setModal({ isOpen: true, startTime: timeSlot });
  };

  const closeModal = () => {
    setModal({ isOpen: false, startTime: null });
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
      {modal.isOpen && (
        <Modal
          closeModal={closeModal}
          selectedTimeSlot={modal.startTime}
          events={events}
          loadEvents={loadEvents}
        />
      )}
    </>
  );
};

export default App;
