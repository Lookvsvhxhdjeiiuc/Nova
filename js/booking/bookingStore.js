import { readJSON, writeJSON } from '../utils/storage.js';

const STORAGE_KEY = 'nova_bookings';

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `booking-${Date.now()}-${Math.round(Math.random() * 10000)}`;
}

export function getBookings() {
  return readJSON(STORAGE_KEY, []);
}

export function saveBooking(bookingData) {
  const bookings = getBookings();
  const newBooking = { id: generateId(), createdAt: new Date().toISOString(), ...bookingData };
  bookings.push(newBooking);
  writeJSON(STORAGE_KEY, bookings);
  return newBooking;
}

export function deleteBooking(id) {
  writeJSON(STORAGE_KEY, getBookings().filter((booking) => booking.id !== id));
}

export function getBookedTimesForDate(dateStr) {
  return getBookings().filter((booking) => booking.date === dateStr).map((booking) => booking.time);
}
