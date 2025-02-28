import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
    }),
    actions: {
        setUser(user) {
            this.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        updateUserPoints(points) {
            if (this.user) {
                this.user.point = points;
                this.setUser(this.user);
            }
        },
    },
});
