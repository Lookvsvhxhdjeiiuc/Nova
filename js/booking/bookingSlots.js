import { getWeekdayKey } from '../utils/formatDate.js';

export function generateSlotsForDay(dayHours, slotDurationMinutes) {
  if (!dayHours) return [];

  const slots = [];
  const [openHour, openMinute] = dayHours.open.split(':').map(Number);
  const [closeHour, closeMinute] = dayHours.close.split(':').map(Number);

  let current = openHour * 60 + openMinute;
  const end = closeHour * 60 + closeMinute;

  while (current + slotDurationMinutes <= end) {
    const hours = String(Math.floor(current / 60)).padStart(2, '0');
    const minutes = String(current % 60).padStart(2, '0');
    slots.push(`${hours}:${minutes}`);
    current += slotDurationMinutes;
  }

  return slots;
}

export function getAvailableSlots({ dateStr, workingHours, slotDurationMinutes, bookedTimes }) {
  const dayHours = workingHours[getWeekdayKey(dateStr)];
  const allSlots = generateSlotsForDay(dayHours, slotDurationMinutes);
  return allSlots.filter((slot) => !bookedTimes.includes(slot));
}
