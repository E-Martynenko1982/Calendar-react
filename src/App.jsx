import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { fetchEvents, createEvent, deleteEvent as deleteEventFromServer } from './gateway/events';
import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((fetchedEvents) => {
        if (fetchedEvents) {
          setEvents(fetchedEvents); // Устанавливаем события в состояние
        }
      })
      .catch((error) => {
        console.error('Error while fetching events:', error.message);
      });
  }, []);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const goToNextWeek = () => {
    const nextWeekStartDate = new Date(weekStartDate);
    nextWeekStartDate.setDate(weekStartDate.getDate() + 7);
    setWeekStartDate(nextWeekStartDate);
  };

  const goToPreviousWeek = () => {
    const prevWeekStartDate = new Date(weekStartDate);
    prevWeekStartDate.setDate(weekStartDate.getDate() - 7);
    setWeekStartDate(prevWeekStartDate);
  };

  const goToCurrentWeek = () => {
    setWeekStartDate(new Date());
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addEvent = (newEvent) => {
    const eventStart = new Date(`${newEvent.date}T${newEvent.startTime}`);
    const eventEnd = new Date(`${newEvent.date}T${newEvent.endTime}`);

    const event = {
      title: newEvent.title,
      dateFrom: eventStart,
      dateTo: eventEnd,
    };

    createEvent(event)
      .then((createdEvent) => {
        setEvents((prevEvents) => [...prevEvents, createdEvent]);
        closeModal();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const deleteEvent = (id) => {
    deleteEventFromServer(id)
      .then(() => {
        setEvents(events.filter((event) => event.id !== id));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  console.log(events)

  return (
    <>
      <Header
        weekDates={weekDates}
        goToNextWeek={goToNextWeek}
        goToPreviousWeek={goToPreviousWeek}
        goToCurrentWeek={goToCurrentWeek}
        openModal={openModal}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        deleteEvent={deleteEvent}
      />
      {isModalOpen && <Modal closeModal={closeModal} addEvent={addEvent} />}
    </>
  );
};

export default App;

