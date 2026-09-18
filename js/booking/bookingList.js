import { getBookings, deleteBooking } from './bookingStore.js';
import { formatDateHuman } from '../utils/formatDate.js';

export function renderBookingList() {
  const container = document.getElementById('booking-list');
  if (!container) return;

  const bookings = getBookings().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  if (bookings.length === 0) {
    container.innerHTML = '<p class="booking-list__empty">Du har endnu ikke booket nogen tid.</p>';
    return;
  }

  container.innerHTML = `
    <h3 class="booking-list__title">Dine bookinger</h3>
    <ul class="booking-list__items">
      ${bookings.map((booking) => `
        <li class="booking-list__item" data-id="${booking.id}">
          <div>
            <strong>${booking.serviceName}</strong>
            <span>${formatDateHuman(booking.date)} · kl. ${booking.time}</span>
          </div>
          <button type="button" class="booking-list__cancel" data-id="${booking.id}">Annuller</button>
        </li>
      `).join('')}
    </ul>
  `;

  container.querySelectorAll('.booking-list__cancel').forEach((button) => {
    button.addEventListener('click', () => {
      deleteBooking(button.dataset.id);
      renderBookingList();
    });
  });
}
