import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Manufacturers = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [formData, setFormData] = useState({ tennhasanxuat: "", trangthai: true });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const fetchManufacturers = async () => {
        try {
            const response = await api.get("/manufacturers");
            setManufacturers(response.data);
        } catch (error) {
            console.error("Error fetching manufacturers:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/manufacturers/${editId}`, formData);
                alert("Cập nhật nhà sản xuất thành công!");
            } else {
                await api.post("/manufacturers", formData);
                alert("Thêm nhà sản xuất thành công!");
            }
            fetchManufacturers();
            setFormData({ tennhasanxuat: "", trangthai: true });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving manufacturer:", error);
            alert("Có lỗi xảy ra!");
        }
    };

    const handleEdit = (manufacturer) => {
        setFormData(manufacturer);
        setEditId(manufacturer.manhasanxuat);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhà sản xuất này?")) {
            try {
                await api.delete(`/manufacturers/${id}`);
                fetchManufacturers();
            } catch (error) {
                console.error("Error deleting manufacturer:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>Quản lý Nhà sản xuất</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên nhà sản xuất</label>
                    <input
                        type="text"
                        name="tennhasanxuat"
                        value={formData.tennhasanxuat}
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
                        <th>Tên nhà sản xuất</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer) => (
                        <tr key={manufacturer.manhasanxuat}>
                            <td>{manufacturer.manhasanxuat}</td>
                            <td>{manufacturer.tennhasanxuat}</td>
                            <td>{manufacturer.trangthai ? "Kích hoạt" : "Không kích hoạt"}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(manufacturer)}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(manufacturer.manhasanxuat)}
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

export default Manufacturers;
