import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

    if (!user) {
        return <Navigate to="/login" />; // Nếu chưa đăng nhập, chuyển đến trang login
    }

    if (!allowedRoles.includes(user.ma_vai_tro)) {
        return <Navigate to="/unauthorized" />; // Nếu không có quyền, chuyển đến trang unauthorized
    }

    return children;
};

export default PrivateRoute;
