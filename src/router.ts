import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue';
import Login from './views/LoginPage.vue';
import Reservation from './views/ReservationPage.vue';
import MyReservations from './views/MyReservationsPage.vue';
import FreePlacesOfDay from './views/FreePlacesOfDayPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/reservation', component: Reservation },
  { path: '/my-reservations', component: MyReservations },
  { path: '/free-places', component: FreePlacesOfDay },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
