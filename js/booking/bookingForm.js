import { getAvailableSlots } from './bookingSlots.js';
import { saveBooking, getBookedTimesForDate } from './bookingStore.js';
import { renderBookingList } from './bookingList.js';
import { formatDateHuman } from '../utils/formatDate.js';

export function initBookingForm(services, workingHoursData) {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const dateInput = document.getElementById('booking-date');
  const timeSelect = document.getElementById('booking-time');
  const serviceSelect = document.getElementById('booking-service');
  const feedback = document.getElementById('booking-feedback');

  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  function setFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = 'booking-feedback';
    if (type) feedback.classList.add(`booking-feedback--${type}`);
  }

  function refreshTimeOptions() {
    if (!dateInput.value) {
      timeSelect.innerHTML = '<option value="">Vælg dato først...</option>';
      timeSelect.disabled = true;
      return;
    }

    const bookedTimes = getBookedTimesForDate(dateInput.value);
    const slots = getAvailableSlots({
      dateStr: dateInput.value,
      workingHours: workingHoursData.workingHours,
      slotDurationMinutes: workingHoursData.slotDurationMinutes,
      bookedTimes,
    });

    if (slots.length === 0) {
      timeSelect.innerHTML = '<option value="">Ingen ledige tider denne dag</option>';
      timeSelect.disabled = true;
      return;
    }

    timeSelect.disabled = false;
    timeSelect.innerHTML = '<option value="">Vælg tidspunkt...</option>' +
      slots.map((slot) => `<option value="${slot}">${slot}</option>`).join('');
  }

  dateInput.addEventListener('change', refreshTimeOptions);
  refreshTimeOptions();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const serviceId = serviceSelect.value;
    const date = dateInput.value;
    const time = timeSelect.value;
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();

    if (!serviceId || !date || !time || !name || !phone) {
      setFeedback('Udfyld venligst alle felter.', 'error');
      return;
    }

    if (getBookedTimesForDate(date).includes(time)) {
      setFeedback('Den valgte tid er desværre lige blevet booket. Vælg en anden tid.', 'error');
      refreshTimeOptions();
      return;
    }

    const service = services.find((item) => item.id === serviceId);
    const booking = saveBooking({
      serviceId,
      serviceName: service ? service.name : serviceId,
      date,
      time,
      name,
      phone,
    });

    setFeedback(`Tak, ${name}! Din tid til ${booking.serviceName} ${formatDateHuman(date)} kl. ${time} er booket.`, 'success');

    form.reset();
    dateInput.min = today;
    refreshTimeOptions();
    renderBookingList();
  });

  renderBookingList();
}
