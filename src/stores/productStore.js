import { defineStore } from "pinia";
import { getProducts } from "@/services/productService";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const fetchedProducts = await getProducts();
        this.products = fetchedProducts;
        localStorage.setItem("products", JSON.stringify(fetchedProducts));
      } catch (error) {
        console.error(error);
      }
    },
  },
});
