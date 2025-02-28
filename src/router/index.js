import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import Reward from "@/components/Reward.vue";
import Profile from "@/components/Profile.vue";
import ProductDetail from "@/components/ProductDetail.vue";

const routes = [
  { path: "/login", component: Login, name: "Login", },
  { path: "/", component: Home, name: "Home", meta: { requiresAuth: true } },
  { path: '/reward', component: Reward, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name === "Login" && authStore.isAuthenticated) {
    next({ name: "Home" });
  } else if (!authStore.isAuthenticated && to.name !== "Login") {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
