import { Reservation } from "~/types/reservation";
import { supabase } from "./supabaseClient";

const {
  data: { user },
} = await supabase.auth.getUser();

export async function getReservationsByUser(): Promise<Reservation[]> {
  const { data: reservations, error } = await supabase
    .from("Reservation")
    .select(`*, Location(*, Area(*, Room(*, Building(*))))`)
    .eq("id_user", user?.id);

  if (error) {
    console.error(
      "Erreur lors de la récupération des réservations pour l'utilisateur :",
      error
    );
    return [];
  }

  const reservationsData: Partial<Reservation>[] = reservations?.map((reservation) => {
    if (!reservation.Location) {
      return {};
    }
  
    return {
      id: reservation.id,
      id_user: reservation.id_user,
      placeNumber: reservation.place_number,
      date_start: reservation.date_start,
      date_end: reservation.date_end,
      created_at: reservation.created_at,
      locationPlaceNumber: reservation.Location.place_number,
      areaId: reservation.Location.Area.id,
      areaName: reservation.Location.Area.name,
      areaPlaces: reservation.Location.Area.places,
      roomId: reservation.Location.Area.Room.id,
      roomName: reservation.Location.Area.Room.name,
      roomPlaces: reservation.Location.Area.Room.places,
      buildingId: reservation.Location.Area.Room.Building.id,
      buildingName: reservation.Location.Area.Room.Building.name,
    };
  }).filter(reservation => Object.keys(reservation).length !== 0) || [];
  
  return reservationsData as Reservation[];
}


export async function deleteReservation(
  reservationId: string
): Promise<boolean> {

  console.log('Deleting reservation with id: ', reservationId);

  const { error } = await supabase
    .from("Reservation")
    .delete()
    .match({ id: reservationId });

    console.log(error);
  if (error) {
    console.error("Erreur lors de la suppression de la réservation :", error);
    return false;
  }

  return true;
}
