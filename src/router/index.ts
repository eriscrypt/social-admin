import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: { name: "users" },
  },
  {
    path: "/users",
    name: "users",
    component: () =>
      import(/* webpackChunkName: "users" */ "../views/Users.vue"),
  },
  {
    path: "/users/:id",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/UsersId.vue"),
  },
  {
    path: "/roles",
    name: "roles",
    component: () =>
      import(/* webpackChunkName: "roles" */ "../views/Roles.vue"),
  },
  {
    path: "/extra",
    name: "extra",
    component: () =>
      import(/* webpackChunkName: "extra" */ "../views/Extra.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { me } = useAuthStore();
  const { isAuthenticated } = storeToRefs(useAuthStore());
  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    await me();
  }

  if (to.name !== "auth" && isAuthenticated.value) {
    return next();
  }

  if (to.name !== "auth" && !isAuthenticated.value) {
    return next("/auth");
  }

  if (to.name === "auth" && isAuthenticated.value) {
    return next("/");
  }

  next();
});

export default router;
