import { loadJSON } from './utils/loadJSON.js';
import { renderServices, renderServiceOptions } from './services.js';
import { renderGallery } from './gallery.js';
import { initMenu } from './menu.js';
import { initBookingForm } from './booking/bookingForm.js';

const [services, gallery, workingHoursData] = await Promise.all([
  loadJSON('./data/services.json'),
  loadJSON('./data/gallery.json'),
  loadJSON('./data/workingHours.json'),
]);

document.getElementById('services-grid').innerHTML = renderServices(services);
document.getElementById('gallery-grid').innerHTML = renderGallery(gallery);
document.getElementById('booking-service').innerHTML = renderServiceOptions(services);

initMenu();
initBookingForm(services, workingHoursData);
