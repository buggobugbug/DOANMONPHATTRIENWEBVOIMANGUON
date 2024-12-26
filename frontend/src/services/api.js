import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    withCredentials: true,
});

// Hàm lấy CSRF token trước khi gửi request
export const getCsrfToken = async () => {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
    });
};

export const fetchProducts = () => api.get("/products");

// Tạo sản phẩm mới
export const createProduct = (data) => api.post("/products", data);

// Lấy chi tiết sản phẩm
export const fetchProductById = (id) => api.get(`/products/${id}`);

// Cập nhật sản phẩm
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

// Xóa sản phẩm
export const deleteProduct = (id) => api.delete(`/products/${id}`);


export default api;
