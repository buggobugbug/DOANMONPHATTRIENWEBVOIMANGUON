import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tensanpham: "",
        gia: "",
        soluong: "",
        mota: "",
        maloai: "",
        manhasanxuat: "",
    });

    const [selectedFile, setSelectedFile] = useState(null);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setFormData({
                    tensanpham: response.data.tensanpham,
                    gia: response.data.gia,
                    soluong: response.data.soluong,
                    mota: response.data.mota,
                    maloai: response.data.maloai,
                    manhasanxuat: response.data.manhasanxuat,
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("tensanpham", formData.tensanpham);
        formDataToSubmit.append("gia", formData.gia);
        formDataToSubmit.append("soluong", formData.soluong);
        formDataToSubmit.append("mota", formData.mota);
        formDataToSubmit.append("maloai", formData.maloai);
        formDataToSubmit.append("manhasanxuat", formData.manhasanxuat);

        if (selectedFile) {
            formDataToSubmit.append("hinh", selectedFile);
        }

        try {
            await api.post(`/products/${id}?_method=PUT`, formDataToSubmit, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Cập nhật sản phẩm thành công!");
            navigate("/dashboard/products");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Cập nhật sản phẩm thất bại!");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Sửa sản phẩm</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <input
                        type="text"
                        className="form-control"
                        name="maloai"
                        value={formData.maloai}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nhà sản xuất</label>
                    <input
                        type="text"
                        className="form-control"
                        name="manhasanxuat"
                        value={formData.manhasanxuat}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hình ảnh</label>
                    <input
                        type="file"
                        className="form-control"
                        name="hinh"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Cập nhật sản phẩm
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
