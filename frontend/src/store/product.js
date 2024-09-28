import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all fields" }
        };

        const response = await axios.post("http://localhost:5000/api/products", newProduct);
        set((state) => ({ products: [...state.products, response.data] }));
        return { success: true, message: "Product created successfully" };
    },
    fetchProducts: async () => {
        const response = await axios.get("http://localhost:5000/api/products");
        set({ products: response.data.data });
    },
    deleteProduct: async (pid) => {
        const res = await axios.delete(`http://localhost:5000/api/products/${pid}`);
        if (!res.data.success) return { success: false, message: res.data.message };

        set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
        return { success: true, message: res.data.message };
    },
    updateProduct: async (pid, updatedProduct) => {
        if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            return { success: false, message: "Please fill in all fields" }
        };

        const res = await axios.put(`http://localhost:5000/api/products/${pid}`, updatedProduct);
        if (!res.data.success) return { success: false, message: res.data.message };

        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? res.data.data : product)),
        }));

        return { success: true, message: res.data.message };
    }
}));