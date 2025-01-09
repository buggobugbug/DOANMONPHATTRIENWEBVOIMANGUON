import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            try {
                await api.delete(`/users/${id}`);
                fetchUsers(); // Refresh user list
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Quản lý người dùng</h1>
            <Link to="/dashboard/create-user" className="btn btn-primary mb-3">
                Thêm người dùng mới
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên đăng nhập</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Ảnh đại diện</th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.ma_nguoi_dung}>
                            <td>{user.ma_nguoi_dung}</td>
                            <td>{user.ten_dang_nhap}</td>
                            <td>{user.ho_ten}</td>
                            <td>{user.email}</td>
                            <td>{user.so_dien_thoai}</td>
                            <td>{user.dia_chi}</td>
                            <td>
                                {user.anh_dai_dien && (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${user.anh_dai_dien}`}
                                        alt={user.ho_ten}
                                        style={{ width: "100px", height: "auto" }}
                                    />
                                )}
                            </td>
                            <td>{user.ma_vai_tro === 1 ? "Admin" : "User"}</td>
                            <td>
                                <Link
                                    to={`/dashboard/edit-user/${user.ma_nguoi_dung}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Sửa
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(user.ma_nguoi_dung)}
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

export default Users;
