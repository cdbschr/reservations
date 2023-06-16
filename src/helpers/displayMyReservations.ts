type Reservation = {
  id: number;
  id_user: string;
  placeNumber: number;
  date_start: string;
  date_end: string;
  created_at: string;
  areaName: string;
  date_range?: string[];
};

export const generateDateRange = (start: string, end: string) => {
  const start_date = new Date(start);
  const end_date = new Date(end);
  const date_range = [];

  while (start_date <= end_date) {
    date_range.push(new Date(start_date).toISOString().split("T")[0]);
    start_date.setDate(start_date.getDate() + 1);
  }

  return date_range;
};

export const expandAndSortReservations = (
  reservations: Reservation[],
  filterDate: Date | null,
  isAfter: boolean,
  specificDate = false
) => {
  const expandedReservations: Reservation[] = [];

  reservations.forEach((reservation: Reservation) => {
    const date_range = generateDateRange(
      reservation.date_start,
      reservation.date_end
    );

    date_range.forEach((date) => {
      const newReservation = { ...reservation, date_start: date };
      expandedReservations.push(newReservation);
    });
  });
  
  let filteredReservations: Reservation[] = [];

  if (specificDate) {
    filteredReservations = expandedReservations.filter((reservation) =>
      new Date(reservation.date_start).toISOString().split("T")[0] === filterDate?.toISOString().split("T")[0]
    );
    console.log("if", filteredReservations);
  } else {
    filteredReservations = expandedReservations.filter((reservation) => {
      const date = new Date(reservation.date_start);
      
      const refDate = filterDate || new Date();
      refDate.setHours(0, 0, 0, 0);

      return isAfter ? date >= refDate : false;
    });
  }

  filteredReservations.sort(
    (a, b) =>
      new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
  );

  return filteredReservations;
};
