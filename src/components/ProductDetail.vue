<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <button @click="goBack" class="btn btn-light">
            <i class="fa fa-arrow-left mr-2"></i> ย้อนกลับ
        </button>
    </div>

    <div>
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card-collapsible card">
                    <div class="card-header">
                        <h3>{{ product?.name }}</h3>
                    </div>
                    <div class="card-body justify-content-around text-center">
                        <div v-if="product">
                            <img :src="product.image_url" :alt="product.name" width="300" class="rounded mb-5">
                            <p class="text-left">คะแนนที่จะใช้แลกรับสิทธิ์: {{ product.point.toLocaleString('en-US') }}</p>
                            <p class="text-left">ระยะเวลาในการแลกรับสิทธิ์ถึงวันที่ {{ product.expire_date }} เท่านั้น</p>
                            <p class="text-left">เงื่อนไข : การแลก 1 รายการต่อ 1 สิทธิ์</p>
                            <button v-if="hasRedeemed" class="btn btn-md btn-warning" disabled>
                                แลกรับสิทธิ์แล้ว!
                            </button>
                            <button v-else class="btn btn-md btn-success" @click="submitRedeemPoints" :disabled="(userStore.user.point < product.point)">
                                แลกรับสิทธิ์
                            </button>
                        </div>
                        <div v-else>
                            <p>โหลดข้อมูล...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const product = ref(null);
const hasRedeemed = ref(false);

onMounted(() => {
    const productId = route.params.id;

    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const productData = products.data.find(p => p.id === parseInt(productId));
        product.value = productData || null;
    } else {
        console.error("ไม่พบข้อมูลสินค้าใน localStorage");
    }

    const redeemedProducts = JSON.parse(localStorage.getItem('redeemedProducts')) || [];
    if (redeemedProducts.includes(product.value?.id)) {
        hasRedeemed.value = true;
    }
});

const goBack = () => {
    router.go(-1);
};

const submitRedeemPoints = () => {
    Swal.fire({
        title: 'ยืนยันการแลกรับสิทธิ์',
        text: `คุณต้องการแลกรับสิทธิ์นี้โดยใช้ ${product.value.point.toLocaleString('en-US')} คะแนนหรือไม่?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            redeemPoints();
        }
    });
};

const redeemPoints = () => {
    if (userStore.user && userStore.user.point >= product.value.point) {
        const newPoints = userStore.user.point - product.value.point;
        userStore.updateUserPoints(newPoints);

        let redeemedProducts = JSON.parse(localStorage.getItem('redeemedProducts')) || [];
        redeemedProducts.push(product.value.id);
        localStorage.setItem('redeemedProducts', JSON.stringify(redeemedProducts));

        hasRedeemed.value = true;

        Swal.fire('สำเร็จ!', 'แลกรับสิทธิ์เรียบร้อยแล้ว.', 'success');
    } else {
        Swal.fire('ไม่สามารถแลกรับสิทธิ์ได้!', 'คะแนนไม่เพียงพอในการแลกรับสิทธิ์', 'error');
    }
};
</script>
