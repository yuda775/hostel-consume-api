import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      ],
    },
  ],
});

export default router;
