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
      const formattedData = data.map(event => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo)
      }));
      console.log('Fetched and formatted events:', formattedData);
      return formattedData;
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
