export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins;
};

export const roundToNearest15 = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date passed to roundToNearest15');
    return new Date();
  }

  const minutes = date.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 15) * 15;
  const finalMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;
  const adjustedHours = roundedMinutes === 60 ? date.getHours() + 1 : date.getHours();

  return new Date(date.setHours(adjustedHours, finalMinutes, 0));
};

export const validateEvent = (eventStart, eventEnd, events) => {
  const sixHoursInMillis = 6 * 60 * 60 * 1000;

  if (eventEnd.getTime() - eventStart.getTime() > sixHoursInMillis) {
    alert('Событие не может длиться дольше 6 часов.');
    return false;
  }

  if (eventStart.toDateString() !== eventEnd.toDateString()) {
    alert('Событие должно начаться и закончиться в пределах одного дня.');
    return false;
  }

  const isOverlapping = events.some(
    (event) => eventStart < event.dateTo && eventEnd > event.dateFrom
  );

  if (isOverlapping) {
    alert('События не могут пересекаться по времени.');
    return false;
  }

  return true;
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const shortMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];