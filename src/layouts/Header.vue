<template>
    <header class="navbar navbar-expand sticky-top bg-primary navbar-dark flex-column flex-md-row bd-navbar">
        <a class="navbar-brand mr-0 mr-md-2" href="#">
            ระบบ Point
        </a>

        <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">

            <li class="nav-item">
                <a class="nav-link p-3">
                    <i class="fa fa-trophy mr-2"></i>
                    <b>คะแนนที่มีอยู่ : {{ user?.point.toLocaleString('en-US') }}</b>
                </a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    {{ user?.name }}
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
                    <a @click="logout" class="dropdown-item" href="#">
                        <i class="fa fa-power-off pr-2"></i> ออกจากระบบ
                    </a>
                </div>
            </li>

        </ul>

    </header>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/userStore";

const authStore = useAuthStore();
const userStore = useUserStore();

const logout = async () => {
    await authStore.logout();
};

const user = userStore.user;

onMounted(() => {
    if (!userStore.user) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            userStore.setUser(JSON.parse(storedUser));
        }
    }
});

</script>