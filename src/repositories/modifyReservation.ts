export function getDuration(date_start: string, date_end: string): string {
  const start = new Date(date_start);
  const end = new Date(date_end);

  const startHour = start.getUTCHours();
  const endHour = end.getUTCHours();

  if (startHour === 8 && endHour === 19) {
    return "journee";
  } else if (startHour === 8 && endHour === 12) {
    return "matin";
  } else if (startHour === 13 && endHour === 19) {
    return "apres-midi";
  } else {
    throw new Error("Heures de réservation non reconnues");
  }
}
