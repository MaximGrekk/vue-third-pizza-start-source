import { isLoggedIn } from "@/middlewares/isLoggedIn";

export default [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      layout: "AppLayoutDefault",
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartView.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/success",
    name: "success",
    component: () => import("@/views/SuccessView.vue"),
    meta: { layout: "SimpleLayout" },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView.vue"),
    meta: {
      layout: "AppLayoutMain",
      middelwares: [isLoggedIn],
    },
    children: [
      {
        path: "orders",
        name: "orders",
        component: () => import("@/views/OrdersView.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue"),
      },
    ],
  },
];
