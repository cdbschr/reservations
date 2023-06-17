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

  console.log('in generateDateRange start',start_date);
  console.log('in generateDateRange end',end_date);
  

  while (start_date <= end_date) {
     const formattedDate = new Date(start_date).toISOString().split("T")[0];
     const formattedTime = new Date(start_date).toISOString().split("T")[1].split('Z')[0];

     date_range.push(`${formattedDate}T${formattedTime}+02`);
     start_date.setDate(start_date.getDate() + 1);
  }
  console.log(date_range);
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

    console.log('in expandandsortReservation : ',date_range);

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
