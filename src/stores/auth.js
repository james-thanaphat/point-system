import { defineStore } from "pinia";
import axios from "axios";
import { toRaw } from "vue";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async login(param) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", param);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(toRaw(this.user)));
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.clear();
      this.isAuthenticated = false;
      window.location.reload();
    },
    checkAuthentication() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
  },
});
