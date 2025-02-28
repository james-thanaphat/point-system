<template>
  <section class="login-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
          <div class="login-wrap p-4 p-md-5">
            <div class="icon d-flex align-items-center justify-content-center">
              <span class="fa fa-user-o"></span>
            </div>
            <h3 class="text-center mb-4">เข้าสู่ระบบ</h3>
            <form @submit.prevent="handleLogin" class="login-form">
              <div class="form-group">
                <input type="text" class="form-control rounded-left" v-model="username" placeholder="ชื่อผู้ใช้งาน" required>
              </div>
              <div class="form-group d-flex">
                <input type="password" class="form-control rounded-left" v-model="password" placeholder="รหัสผ่าน" required>
              </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-primary rounded submit px-3">เข้าสู่ระบบ</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const username = ref("");
const password = ref("");

const handleLogin = async () => {
  const success = await authStore.login({ username: username.value, password: password.value });
  if (success) {
    router.push("/");
  } else {
    alert("เข้าสู่ระบบไม่สำเร็จ!");
  }
};
</script>
