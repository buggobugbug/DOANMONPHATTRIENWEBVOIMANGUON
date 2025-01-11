import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ten_dang_nhap: '',
        email: '',
        ho_ten: '',
        so_dien_thoai: '',
        dia_chi: '',
        ma_vai_tro: '',
        anh_dai_dien: null,
    });
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                setFormData({
                    ten_dang_nhap: response.data.ten_dang_nhap,
                    email: response.data.email,
                    ho_ten: response.data.ho_ten,
                    so_dien_thoai: response.data.so_dien_thoai || '',
                    dia_chi: response.data.dia_chi || '',
                    ma_vai_tro: response.data.ma_vai_tro,
                    anh_dai_dien: null,
                });
                setPreviewImage(
                    response.data.anh_dai_dien
                        ? `http://127.0.0.1:8000/storage/${response.data.anh_dai_dien}`
                        : ''
                );
            } catch (error) {
                console.error('Error fetching user:', error);
                alert('Không thể tải thông tin người dùng!');
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, anh_dai_dien: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('ten_dang_nhap', formData.ten_dang_nhap);
            data.append('email', formData.email);
            data.append('ho_ten', formData.ho_ten);
            data.append('so_dien_thoai', formData.so_dien_thoai);
            data.append('dia_chi', formData.dia_chi);
            data.append('ma_vai_tro', formData.ma_vai_tro);
            if (formData.anh_dai_dien) {
                data.append('anh_dai_dien', formData.anh_dai_dien);
            }

            console.log('Data to send:', Array.from(data.entries())); // Kiểm tra dữ liệu

            await api.post(`/users/update/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Cập nhật thông tin người dùng thành công!');
            navigate('/dashboard/accounts');
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
            alert('Cập nhật thông tin người dùng thất bại!');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Chỉnh sửa thông tin người dùng</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ten_dang_nhap"
                        value={formData.ten_dang_nhap}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Họ và tên</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ho_ten"
                        value={formData.ho_ten}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                        type="text"
                        className="form-control"
                        name="so_dien_thoai"
                        value={formData.so_dien_thoai}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dia_chi"
                        value={formData.dia_chi}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Vai trò</label>
                    <select
                        className="form-control"
                        name="ma_vai_tro"
                        value={formData.ma_vai_tro}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn vai trò</option>
                        <option value="1">Admin</option>
                        <option value="2">User thường</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ảnh đại diện</label>
                    <input
                        type="file"
                        className="form-control"
                        name="anh_dai_dien"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {previewImage && (
                        <div className="mt-3">
                            <img src={previewImage} alt="Preview" style={{ width: '150px', height: 'auto' }} />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                <button
                    type="button"
                    className="btn btn-secondary ms-3"
                    onClick={() => navigate('/dashboard/accounts')}
                >
                    Quay lại
                </button>
            </form>
        </div>
    );
};

export default EditUser;
