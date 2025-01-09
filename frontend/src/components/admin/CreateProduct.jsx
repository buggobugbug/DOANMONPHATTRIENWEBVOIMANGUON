import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tensanpham: "",
        gia: "",
        soluong: "",
        mota: "",
        maloai: "",
        manhasanxuat: "",
    });
    const [hinh, setHinh] = useState(null); // Lưu tệp hình ảnh
    const [categories, setCategories] = useState([]); // Danh sách loại sản phẩm
    const [manufacturers, setManufacturers] = useState([]); // Danh sách nhà sản xuất

    // Lấy danh sách loại sản phẩm và nhà sản xuất khi component mount
    useEffect(() => {
        fetchCategories();
        fetchManufacturers();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchManufacturers = async () => {
        try {
            const response = await api.get("/manufacturers");
            setManufacturers(response.data);
        } catch (error) {
            console.error("Error fetching manufacturers:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setHinh(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("tensanpham", formData.tensanpham);
            formDataToSend.append("gia", formData.gia);
            formDataToSend.append("soluong", formData.soluong);
            formDataToSend.append("mota", formData.mota);
            formDataToSend.append("maloai", formData.maloai);
            formDataToSend.append("manhasanxuat", formData.manhasanxuat);
            if (hinh) {
                formDataToSend.append("hinh", hinh); // Gửi tệp hình ảnh nếu có
            }

            await api.post("/products", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Thêm sản phẩm thành công!");
            navigate("/dashboard/products");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Thêm sản phẩm thất bại!");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Thêm sản phẩm mới</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên sản phẩm</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tensanpham"
                        value={formData.tensanpham}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá</label>
                    <input
                        type="number"
                        className="form-control"
                        name="gia"
                        value={formData.gia}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Số lượng</label>
                    <input
                        type="number"
                        className="form-control"
                        name="soluong"
                        value={formData.soluong}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                        className="form-control"
                        name="mota"
                        value={formData.mota}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Mã loại</label>
                    <select
                        className="form-control"
                        name="maloai"
                        value={formData.maloai}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Chọn loại sản phẩm --</option>
                        {categories.map((category) => (
                            <option key={category.maloai} value={category.maloai}>
                                {category.tenloai}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nhà sản xuất</label>
                    <select
                        className="form-control"
                        name="manhasanxuat"
                        value={formData.manhasanxuat}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Chọn nhà sản xuất --</option>
                        {manufacturers.map((manufacturer) => (
                            <option
                                key={manufacturer.manhasanxuat}
                                value={manufacturer.manhasanxuat}
                            >
                                {manufacturer.tennhasanxuat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Hình ảnh</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Thêm sản phẩm
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
