<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h2 class="h5"><i class="fa fa-user-o"></i> Profile</h2>
        <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
                <button class="btn btn-sm btn-primary">
                    <i class="fa fa-user mr-2"></i>
                    {{ user?.name }}
                </button>
            </div>
            <div class="btn-group mr-2">
                <button class="btn btn-sm btn-primary">
                    <i class="fa fa-trophy mr-2"></i>
                    คะแนนที่มีอยู่ : {{ user?.point.toLocaleString('en-US') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const user = userStore.user;

onMounted(async () => {
    if (!userStore.user) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            userStore.setUser(JSON.parse(storedUser));
        }
    }
});
</script>
