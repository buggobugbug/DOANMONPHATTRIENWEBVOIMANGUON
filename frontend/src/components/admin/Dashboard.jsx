import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import '../css/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy token từ localStorage
        const token = localStorage.getItem("authToken");

        // Nếu không có token, chuyển hướng về trang login
        if (!token) {
            console.log("Token không tồn tại, chuyển hướng đến trang login.");
            navigate("/login");
        } else {
            console.log("Đã tìm thấy token:", token);
        }
    }, [navigate]);

    const onLogout = () => {
        // Xóa token và vai trò người dùng khỏi localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <Link to="/dashboard" className="dashboard-title">
                    <h2>Quản trị</h2>
                </Link>
                <ul>
                    {/* Các liên kết đến các trang quản lý */}
                    <li>
                        <Link to="/dashboard/products">Sản phẩm</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/categories">Loại sản phẩm</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/manufacturers">Nhà sản xuất</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/create">Thêm sản phẩm mới</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/orders">Đơn hàng</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/accounts">Tài khoản người dùng</Link>
                    </li>
                    <li onClick={onLogout}>
                        <span>Đăng xuất</span>
                    </li>
                </ul>
            </div>

            <div className="main-content">
                <header className="admin-header">
                    <h1>Dashboard</h1>
                </header>
                <main>
                    <Outlet /> {/* Render các component con tại đây */}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
