import { supabase } from "./supabaseClient";

type ReservationObj = {
  date1: string;
  date2: string;
  duration: string;
  room: string;
  location: string;
};

type NewReservationObj = {
  id_user: any;
  place_number: any;
  created_at: Date;
  date_start?: string;
  date_end?: string;
};

const {
  data: { user },
} = await supabase.auth.getUser();

export async function getRooms() {
  const { data: room, error } = await supabase.from("Room").select("id, name");

  console.log("room", room);

  if (error) {
    console.error("Erreur lors de la récupération des salles :", error);
    return null;
  }

  return room;
}

export async function getLocationsByRoom(
  roomId: string,
  dateStart: string,
  dateEnd: string
) {
  const { data: areas, error: areaError } = await supabase
    .from("Area")
    .select("id")
    .eq("id_room", roomId);

  if (areaError) {
    console.error(
      `Erreur lors de la récupération des zones pour la salle ${roomId} :`,
      areaError
    );
    return null;
  }

  const reservations = await getReservations(
    new Date(dateStart),
    new Date(dateEnd)
  );
  console.log("reservations", reservations);

  if (!reservations) {
    console.error(
      `Erreur lors de la récupération des réservations pour les dates du ${dateStart} au ${dateEnd}`
    );
    return null;
  }

  const { data: locations, error: locationError } = await supabase
    .from("Location")
    .select("place_number")
    .in(
      "id_area",
      areas.map((area) => area.id)
    )
    .order("place_number", { ascending: true });

  if (locationError) {
    console.error(
      `Erreur lors de la récupération des places pour les zones ${areas
        .map((area) => area.id)
        .join(", ")} :`,
      locationError
    );
    return null;
  }

  const availableLocations = locations.filter(
    (location) =>
      !reservations.some(
        (reservation) =>
          reservation.place_number === location.place_number &&
          new Date(reservation.date_start) < new Date(dateEnd) &&
          new Date(reservation.date_end) > new Date(dateStart)
      )
  );

  return availableLocations;
}

export async function getReservations(startDate: Date, endDate: Date) {
  try {
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(24, 0, 0, 0);

    const startDateISO = startDate.toISOString().replace("+02:00", "Z");
    const endDateISO = endDate.toISOString().replace("+02:00", "Z");

    const { data: reservations, error } = await supabase
      .from("Reservation")
      .select("*");

    if (error) {
      console.error(
        "Erreur lors de la récupération des réservations :",
        error.message
      );
      throw error;
    }

    const overlappingReservations = reservations.filter(
      (reservation) =>
        new Date(reservation.date_start) <= new Date(endDateISO) &&
        new Date(reservation.date_end) >= new Date(startDateISO)
    );

    overlappingReservations.forEach((reservation) => {
      console.log("Date de début de la réservation :", reservation.date_start);
      console.log("Date de fin de la réservation :", reservation.date_end);
    });

    console.log(
      "Réservations récupérées avec succès !",
      overlappingReservations
    );
    return overlappingReservations;
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des réservations :",
      error
    );
    throw error;
  }
}

export function transformReservationObj(
  reservationObj: ReservationObj
): NewReservationObj {
  const newReservationObj: NewReservationObj = {
    id_user: user?.id,
    place_number: reservationObj.location,
    created_at: new Date(),
  };

  switch (reservationObj.duration) {
    case "journee":
      if (new Date(reservationObj.date1) >= new Date(reservationObj.date2)) {
        newReservationObj.date_start = `${reservationObj.date1}T08:00:00Z`;
        newReservationObj.date_end = `${reservationObj.date2}T19:00:00Z`;
      } else {
        throw new Error(
          'Pour une réservation de type "journee", date1 doit être inférieure ou égale à date2'
        );
      }
      break;
    case "matin":
      if (
        reservationObj.date1 === reservationObj.date2 ||
        reservationObj.date2 == ""
      ) {
        newReservationObj.date_start = `${reservationObj.date1}T08:00:00Z`;
        newReservationObj.date_end = `${reservationObj.date1}T12:59:00Z`;
      } else {
        throw new Error(
          'Pour une réservation de type "matin", date1 doit être égale à date2'
        );
      }
      break;
    case "am":
      if (
        reservationObj.date1 === reservationObj.date2 ||
        reservationObj.date2 == ""
      ) {
        newReservationObj.date_start = `${reservationObj.date1}T13:00:00Z`;
        newReservationObj.date_end = `${reservationObj.date1}T19:00:00Z`;
      } else {
        throw new Error(
          'Pour une réservation de type "am", date1 doit être égale à date2'
        );
      }
      break;
    default:
      throw new Error(
        `Type de réservation non reconnu : ${reservationObj.duration}`
      );
  }

  return newReservationObj;
}

export async function createReservation(reservationObj: ReservationObj) {
  try {
    const transformedObj = transformReservationObj(reservationObj);
    const { data: newReservation, error } = await supabase
      .from("Reservation")
      .insert([transformedObj]);

    if (error) {
      console.error(
        "Erreur lors de la création de la réservation :",
        error.message
      );
      throw error;
    }

    console.log("Réservation créée avec succès !", newReservation);
    return newReservation;
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la création de la réservation :",
      error
    );
    throw error;
  }
}
