const WEEKDAYS_DA = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
const WEEKDAYS_EN = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const MONTHS = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

export function formatDateHuman(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStr;
  return `${WEEKDAYS_DA[date.getDay()]} d. ${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function getWeekdayKey(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return WEEKDAYS_EN[date.getDay()];
}
