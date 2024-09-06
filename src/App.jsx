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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [events, setEvents] = useState([]);

  // Функция для загрузки событий с сервера
  const loadEvents = () => {
    fetchEvents()
      .then((fetchedEvents) => {
        if (fetchedEvents) {
          setEvents(fetchedEvents); // Устанавливаем события в состояние
        }
      })
      .catch((error) => {
        console.error('Error while fetching events:', error.message);
      });
  };

  useEffect(() => {
    loadEvents();
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

  const openModal = (timeSlot) => {
    setSelectedTimeSlot(timeSlot); // Устанавливаем выбранное время в состояние
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addEvent = (newEvent) => {
    const eventStart = new Date(`${newEvent.date}T${newEvent.startTime}`);
    const eventEnd = new Date(`${newEvent.date}T${newEvent.endTime}`);

    // Валидация
    const sixHoursInMillis = 6 * 60 * 60 * 1000;
    if (eventEnd.getTime() - eventStart.getTime() > sixHoursInMillis) {
      alert('Событие не может длиться дольше 6 часов.');
      return;
    }

    if (eventStart.toDateString() !== eventEnd.toDateString()) {
      alert('Событие должно начаться и закончиться в пределах одного дня.');
      return;
    }

    const isOverlapping = events.some(event =>
      (eventStart < event.dateTo && eventEnd > event.dateFrom)
    );

    if (isOverlapping) {
      alert('События не могут пересекаться по времени.');
      return;
    }

    // Создание события
    const event = {
      title: newEvent.title,
      dateFrom: eventStart,
      dateTo: eventEnd,
    };

    createEvent(event)
      .then(() => {
        closeModal(); // Закрываем модальное окно после создания события
        loadEvents(); // Загружаем события с сервера после создания события
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const deleteEvent = (id) => {
    const eventToDelete = events.find(event => event.id === id);
    const currentTime = new Date();

    if (eventToDelete && eventToDelete.dateFrom.getTime() - currentTime.getTime() <= 15 * 60 * 1000) {
      alert('Нельзя удалять событие раньше чем за 15 минут до начала.');
      return;
    }

    deleteEventFromServer(id)
      .then(() => {
        loadEvents(); // Перезагружаем события после удаления
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <>
      <Header
        weekDates={weekDates}
        goToNextWeek={goToNextWeek}
        goToPreviousWeek={goToPreviousWeek}
        goToCurrentWeek={goToCurrentWeek}
        openModal={() => openModal(null)}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        deleteEvent={deleteEvent}
        openModal={openModal} // Передаем функцию открытия модального окна
      />
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          addEvent={addEvent}
          selectedTimeSlot={selectedTimeSlot} // Передаем выбранную ячейку (время и дата)
        />
      )}
    </>
  );
};

export default App;




