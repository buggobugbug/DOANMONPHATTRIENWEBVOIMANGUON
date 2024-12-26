import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ tenloai: "", trangthai: true });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/categories/${editId}`, formData);
                alert("Cập nhật loại sản phẩm thành công!");
            } else {
                await api.post("/categories", formData);
                alert("Thêm loại sản phẩm thành công!");
            }
            fetchCategories();
            setFormData({ tenloai: "", trangthai: true });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Có lỗi xảy ra!");
        }
    };

    const handleEdit = (category) => {
        setFormData(category);
        setEditId(category.maloai);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?")) {
            try {
                await api.delete(`/categories/${id}`);
                fetchCategories();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>Quản lý Loại sản phẩm</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên loại</label>
                    <input
                        type="text"
                        name="tenloai"
                        value={formData.tenloai}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {isEditing ? "Cập nhật" : "Thêm mới"}
                </button>
            </form>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên loại</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.maloai}>
                            <td>{category.maloai}</td>
                            <td>{category.tenloai}</td>
                            <td>{category.trangthai ? "Kích hoạt" : "Không kích hoạt"}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(category.maloai)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;
