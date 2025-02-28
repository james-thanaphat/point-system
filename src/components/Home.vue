<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h2 class="h5"><i class="fa fa-home"></i> Home</h2>
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

    <div class="row">
        <swiper :modules="[Navigation, Pagination]" :slides-per-view="4" :space-between="20" :navigation="true"
            :pagination="{ clickable: true }" :breakpoints="{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }" class="">
            <swiper-slide v-for="(product, index) in productStore.products.data" :key="product.id">
                <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
                    <div class="card-sl mb-5">
                        <div class="card-image">
                            <img :src="product.image_url" width="200" />
                        </div>
                        <div class="card-heading text-left pl-0 text-dark text-truncate">{{ product.name }}</div>
                        <div class="card-text text-left p-0">{{ product.description }}</div>
                        <div class="card-text text-left p-0">ระยะเวลาในการแลกรับสิทธิ์ถึงวันที่ {{ product.expire_date
                            }} เท่านั้น</div>
                        <div class="card-text text-right">
                            <h3 style="color:#cb6701">
                                <img :src="starImage" width="20" class="mb-1" />
                                {{ product.point.toLocaleString('en-US') }}
                            </h3>
                        </div>
                    </div>
                </router-link>
            </swiper-slide>
        </swiper>
    </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useUserStore } from "@/stores/userStore";

import starImage from '@/assets/images/star.png';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const productStore = useProductStore();
const userStore = useUserStore();
const user = userStore.user;

onMounted(async () => {
    if (!userStore.user) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            userStore.setUser(JSON.parse(storedUser));
        }
    }

    await productStore.fetchProducts();
});
</script>

<style scoped>
.swiper {
    width: 100%;
}

.card-sl {
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    background: #fff;
    text-align: center;
}
</style>