import { getAuthUser, supabase } from "./supabaseClient";

interface Building {
  id: number;
  name: string;
}

interface Room {
  id: number;
  name: string;
  Building: Building;
}

interface Area {
  id: number;
  name: string;
  Room: Room;
}

interface Location {
  place_number: number;
  Area: Area;
}

interface PlaceData {
  id: number;
  name: string;
  placeNumber: number;
  areaName: string;
  roomName: string;
  buildingName: string;
  Room: {
    id: number;
    name: string;
    Building: {
      id: number;
      name: string;
    };
  };
}

interface Reservation {
  id: string;
  id_user: string;
  place_number: number;
  date_start: string;
  date_end: string;
  created_at: string;
  Location: {
    place_number: number;
    id_area: number;
    Area: {
      id: number;
      name: string;
      places: number;
      id_room: number;
      Room: {
        id: number;
        name: string;
        places: number;
        id_building: number;
        Building: {
          id: number;
          name: string;
        }
      }
    }
  }
}

const auth = await getAuthUser();

export async function getFreePlaces(): Promise<PlaceData[]> {
  const nowStart = new Date();
  nowStart.setHours(0, 0, 0, 0);
  const nowEnd = new Date();
  nowEnd.setHours(23, 59, 59, 999);

  const { data, error: reservationsError } = await supabase
    .from("Reservation")
    .select(`*, Location(*, Area(*, Room(*, Building(*))))`);

  if (reservationsError) {
    console.error("Error getting reservations:", reservationsError);
    return [];
  }

  const reservations: Reservation[] = data as Reservation[];

  const { data: allData, error: placesError } = await supabase
    .from("Location")
    .select("place_number, Area(*, Room(*, Building(*)))");

  if (placesError) {
    console.error("Error getting places:", placesError);
    return [];
  }

  const allPlaces: Location[] = allData as unknown as Location[];

  const occupiedPlaces = new Set(
    reservations?.filter(
      (r) =>
        new Date(r.date_start) <= nowEnd &&
        new Date(r.date_end) >= nowStart
    )
      .map((r) => r.place_number)
  );

  const freePlaces: PlaceData[] =
    allPlaces
      ?.filter((place) => !occupiedPlaces.has(place.place_number))
      .map((place) => ({
        id: place.Area.Room.Building.id,
        name: place.Area.name,
        placeNumber: place.place_number,
        areaName: place.Area.name,
        roomName: place.Area.Room.name,
        buildingName: place.Area.Room.Building.name,
        Room: {
          id: place.Area.Room.id,
          name: place.Area.Room.name,
          Building: {
            id: place.Area.Room.Building.id,
            name: place.Area.Room.Building.name,
          },
        },
      })) || [];

  console.log(freePlaces);

  return freePlaces;
}


export async function createReservation(place_number: string) {
  const today = new Date();
  today.setHours(8, 0, 0, 0);
  const date_hours_start = today.toISOString();

  today.setHours(19, 0, 0, 0);
  const date_hours_end = today.toISOString();

  const { data: newReservation, error } = await supabase
    .from("Reservation")
    .insert([
      {
        id_user: auth.user?.id,
        date_start: date_hours_start,
        date_end: date_hours_end,
        place_number,
      },
    ]);

  if (error) {
    console.error(
      "Erreur lors de la création de la réservation :",
      error.message
    );
    throw error;
  }

  console.log("Réservation créée avec succès !", newReservation);
  return newReservation;
}
