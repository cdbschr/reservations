import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/LoginPage.vue";
import Trigram from "./views/TrigramPage.vue";
import Home from "./views/HomePage.vue";
import Reservation from "./views/ReservationPage.vue";
import MyReservations from "./views/MyReservationsPage.vue";
import FreePlacesOfDay from "./views/FreePlacesOfDayPage.vue";
import { isTrigramExisting, isUserAuthenticated } from "./repositories/userRepository";
import { supabase } from "./repositories/supabaseClient";

const routes = [
  { path: "/login", component: Login },
  { path: "/trigram", component: Trigram, meta: { requiresAuth: true } },
  { path: "/", component: Home, meta: { requiresAuth: true } },
  {
    path: "/reservation",
    component: Reservation,
    meta: { requiresAuth: true },
  },
  {
    path: "/my-reservations",
    component: MyReservations,
    meta: { requiresAuth: true },
  },
  {
    path: "/free-places",
    component: FreePlacesOfDay,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = await isUserAuthenticated();

  if (to.path === "/trigram") {
    const trigramExists = isAuthenticated && await isTrigramExisting((await supabase.auth.getSession()).data.session?.user?.id ?? "");
    if (trigramExists) {
      next("/");
      return;
    }
  }

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
