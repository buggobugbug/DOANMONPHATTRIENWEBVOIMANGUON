import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ten_dang_nhap: '',
        mat_khau: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', formData);
            const { user, token } = response.data;

            // Lưu token và thông tin người dùng
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Chuyển hướng dựa vào vai trò
            if (user.ma_vai_tro === 1) {
                navigate('/dashboard'); // Chuyển đến Dashboard
            } else if (user.ma_vai_tro === 2) {
                navigate('/home'); // Chuyển đến Home
            } else {
                alert('Vai trò không hợp lệ!');
            }
        } catch (error) {
            console.error(error.response?.data?.message || 'Đăng nhập thất bại!');
            alert('Đăng nhập thất bại!');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Đăng Nhập</h2>
            <input
                type="text"
                name="ten_dang_nhap"
                placeholder="Tên đăng nhập"
                value={formData.ten_dang_nhap}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="mat_khau"
                placeholder="Mật khẩu"
                value={formData.mat_khau}
                onChange={handleChange}
                required
            />
            <button type="submit" className="button">Đăng Nhập</button>
        </form>
    );
};

export default Login;
