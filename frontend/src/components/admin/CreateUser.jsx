import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CreateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ten_dang_nhap: "",
        mat_khau: "",
        email: "",
        ho_ten: "",
        so_dien_thoai: "",
        dia_chi: "",
        ma_vai_tro: 2, // Default role is user
    });
    const [anhDaiDien, setAnhDaiDien] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setAnhDaiDien(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            if (anhDaiDien) {
                formDataToSend.append("anh_dai_dien", anhDaiDien);
            }

            await api.post("/users", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Thêm người dùng thành công!");
            navigate("/dashboard/accounts");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Thêm người dùng thất bại!");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Thêm người dùng mới</h1>
            <form onSubmit={handleSubmit}>
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
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        name="mat_khau"
                        value={formData.mat_khau}
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
                    <label className="form-label">Họ tên</label>
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
                    <label className="form-label">Ảnh đại diện</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Vai trò</label>
                    <select
                        className="form-control"
                        name="ma_vai_tro"
                        value={formData.ma_vai_tro}
                        onChange={handleChange}
                    >
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Thêm người dùng
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
