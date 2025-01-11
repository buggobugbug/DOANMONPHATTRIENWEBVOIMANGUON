import axios from 'axios';

// Tạo instance API với cấu hình mặc định
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    withCredentials: true,
});

// Lấy CSRF token
export const getCsrfToken = async () => {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
    });
};

// Lấy thông tin người dùng hiện tại
export const fetchCurrentUser = async () => {
    const response = await api.get('/user');
    return response.data;
};

// Lấy tất cả sản phẩm
export const fetchProducts = () => api.get("/products");

// Lấy chi tiết sản phẩm
export const fetchProductById = (id) => api.get(`/products/${id}`);

// Xóa sản phẩm
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Thêm sản phẩm vào giỏ hàng
export const addToCart = (data) => api.post("/giohang", data);

// Lấy giỏ hàng của người dùng hiện tại
export const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return api.get(`/giohang/${user.ma_nguoi_dung}`);
};

// Cập nhật sản phẩm trong giỏ hàng
export const updateCartItem = (id, data) => api.put(`/giohang/${id}`, data);

// Xóa sản phẩm khỏi giỏ hàng
export const deleteCartItem = (id) => api.delete(`/giohang/${id}`);

// Thanh toán
export const postCheckout = async (checkoutData) => {
    const response = await api.post("/thanh-toan", checkoutData);
    return response.data;
};

// Lấy danh sách đơn hàng theo user ID
export const fetchOrdersByUserId = async (userId) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
};

// Cập nhật thông tin người dùng
export const updateUser = (id, data) => {
    return api.post(`/users/update/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const changePassword = (passwordData) => {
    return api.post('/change-password', passwordData);
};

// Lấy tất cả đơn hàng
export const fetchOrders = () => api.get('/orders');

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = (id, data) => api.put(`/orders/${id}/status`, data);


// Lấy dữ liệu thống kê
export const fetchStatistics = (params) => {
    return api.get('/statistics', { params });
};


export default api;
