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
      alert("Internal Server Error. Can't display events");
      console.error('Error fetching events:', error);
    });
};

export const createEvent = (event) => {
  return fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error creating event:', error.message);
      throw error;
    });
};

export const deleteEvent = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
    })
    .catch((error) => {
      console.error('Error deleting event:', error.message);
      throw error;
    });
};
