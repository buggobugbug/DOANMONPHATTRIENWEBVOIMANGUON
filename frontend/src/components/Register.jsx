import React, { useState } from 'react';
import api from '../services/api';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        ten_dang_nhap: '',
        mat_khau: '',
        email: '',
        ho_ten: '',
        ma_vai_tro: 2,
        so_dien_thoai: '',
        dia_chi: '',
        anh_dai_dien: null, // File ảnh
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'anh_dai_dien') {
            setFormData({ ...formData, anh_dai_dien: files[0] }); // Gán file ảnh vào state
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]); // Kiểm tra từng trường
            });
    
            const response = await api.post('/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error.response?.data?.errors); // In chi tiết lỗi
            alert('Đăng ký thất bại! Vui lòng kiểm tra dữ liệu.');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Đăng Ký</h2>
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
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="ho_ten"
                placeholder="Họ và tên"
                value={formData.ho_ten}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="so_dien_thoai"
                placeholder="Số điện thoại"
                value={formData.so_dien_thoai}
                onChange={handleChange}
            />
            <input
                type="text"
                name="dia_chi"
                placeholder="Địa chỉ"
                value={formData.dia_chi}
                onChange={handleChange}
            />
            <input
                type="file"
                name="anh_dai_dien"
                accept="image/*"
                onChange={handleChange}
            />
            <button type="submit" className="button">Đăng Ký</button>
        </form>
    );
};

export default Register;
