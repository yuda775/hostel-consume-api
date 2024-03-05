import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth Router
    {
      path: "/login",
      component: () => import("@/views/auth/Login.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/auth/Register.vue"),
    },

    // Customer Router
    {
      path: "/",
      component: () => import("@/views/Customer.vue"),
    },

    {
      path: "/reservation/:id",
      component: () => import("@/views/customerViews/Reservation.vue"),
      name: "Reservation",
    },
    {
      path: "/reservation/user/:userId",
      component: () => import("@/views/customerViews/UserReservation.vue"),
      name: "UserReservation",
    },

    // Admin Router
    {
      path: "/admin",
      component: () => import("@/views/Admin.vue"),
      children: [
        { path: "", redirect: "/admin/dashboard" },
        {
          path: "/admin/dashboard",
          component: () => import("../views/adminViews/Dashboard.vue"),
        },
        {
          path: "/admin/rooms",
          component: () => import("../views/adminViews/Rooms.vue"),
        },
        {
          path: "/admin/reservation",
          component: () => import("../views/adminViews/Reservation.vue"),
        },
        {
          path: "/admin/roomFacilities",
          component: () => import("../views/adminViews/RoomFacilities.vue"),
        },
      ],
    },
  ],
});

export default router;
