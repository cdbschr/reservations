import { defineStore } from 'pinia';
import { Reservation } from '~/types/reservation';
import { updateReservation, deleteReservation, getReservationsByUser } from '~/repositories/showReservations'; // Vous devrez adapter le chemin à votre structure de projet

export const useReservationStore = defineStore({
  id: 'reservations',

  state: (): { reservations: Reservation[], selectedReservation: Reservation | null } => ({
    reservations: [],
    selectedReservation: null,
  }),

  actions: {
    setReservations(reservations: Reservation[]) {
      this.reservations = reservations;
    },

    setSelectedReservation(reservation: Reservation) {
      this.selectedReservation = reservation;
    },

    async deleteReservation(reservationId: string) {
      const isDeleted = await deleteReservation(reservationId);
      if (isDeleted) {
        const reservations = await getReservationsByUser();
        this.setReservations(reservations);
      }
    },

    async updateReservation(reservation: Reservation) {
      const isUpdated = await updateReservation(reservation.id.toString(), reservation);
      if (isUpdated) {
        const reservations = await getReservationsByUser();
        this.setReservations(reservations);
      }
    },
  },
});
