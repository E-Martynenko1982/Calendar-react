const baseUrl = 'https://66d9c42d4ad2f6b8ed55f71a.mockapi.io/api/v1/events';

export const fetchEvents = () => {
  return fetch(`${baseUrl}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return response.json();
    })
    .then((data) => {
      return data.map(event => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }));
    })
    .catch((error) => {
      alert("Internal Server Error. Can't display events"); // Показываем сообщение об ошибке
      console.error('Error fetching events:', error);
    });
};

export const createEvent = (eventData) => {
  return fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    return response.json();
  });
};

export const deleteEvent = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
  });
};
