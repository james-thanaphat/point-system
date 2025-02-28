<template>
  <div>
    <Headers v-if="authStore.isAuthenticated" />
    <div class="container-fluid">
      <div class="row">
        <Sidebar v-if="authStore.isAuthenticated" />
        <main v-if="authStore.isAuthenticated" class="col-md-10 ml-sm-auto col-lg-10 pt-3 px-4">
          <router-view />
        </main>
        <main v-else class="col-12">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/layouts/Sidebar.vue";
import Headers from "@/layouts/Header.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Headers
  },
  setup() {
    const authStore = useAuthStore();

    onMounted(() => {
      authStore.checkAuthentication();
    });

    return { authStore };
  },
};
</script>
