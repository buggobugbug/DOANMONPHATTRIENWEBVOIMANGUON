import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt'; // Icon cho danh sách đơn hàng

const Header = () => {
    const navigate = useNavigate();

    const menuItems = [
        'Xe Đạp',
        'Phụ Kiện',
        'Bảo Dưỡng',
        'Tin Tức',
        'Liên Hệ',
    ];

    return (
        <div className="header">
            <div className="header-logo" onClick={() => navigate('/home')}>
                BIKE SHOP
            </div>
            <div className="header-menu">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="header-menu-item"
                        onClick={() => navigate(`/home?category=${item.toLowerCase()}`)}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="header-right">
                <div className="search-box">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Tìm sản phẩm..."
                    />
                </div>
                <div className="header-actions">
                    {/* Icon Trang Cá Nhân */}
                    <div
                        className="action-item"
                        onClick={() => navigate('/home/profile')}
                        style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        <AccountCircleIcon style={{ fontSize: '28px' }} />
                    </div>

                    {/* Icon Giỏ Hàng */}
                    <div
                        className="action-item"
                        onClick={() => navigate('/home/cart')}
                        style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        <ShoppingCartIcon style={{ fontSize: '28px' }} />
                        <span className="cart-badge">0</span> {/* Badge số lượng sản phẩm */}
                    </div>

                    {/* Icon Danh Sách Đơn Hàng */}
                    <div
                        className="action-item"
                        onClick={() => navigate('/home/orders')}
                        style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        <ListAltIcon style={{ fontSize: '28px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
