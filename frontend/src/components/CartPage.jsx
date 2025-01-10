import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchCart, updateCartItem, deleteCartItem, getCsrfToken } from '../services/api';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        const loadCart = async () => {
            try {
                await getCsrfToken();
                const response = await fetchCart();
                setCartItems(response.data);
            } catch (err) {
                setError('Không thể tải giỏ hàng.');
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    const handleUpdateQuantity = async (id, newQuantity) => {
        try {
            await updateCartItem(id, { so_luong: newQuantity });
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, so_luong: newQuantity } : item
                )
            );
        } catch (err) {
            alert('Không thể cập nhật số lượng.');
        }
    };

    const handleDeleteItem = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
        if (!confirmDelete) return;

        try {
            await deleteCartItem(id);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
            alert('Sản phẩm đã được xóa khỏi giỏ hàng!');
        } catch (err) {
            console.error('Lỗi khi xóa sản phẩm:', err);
            alert('Không thể xóa sản phẩm khỏi giỏ hàng.');
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.sanpham.gia * item.so_luong, 0);
    };

    const handleCheckout = () => {
        navigate('/home/checkout'); // Chuyển hướng đến trang CheckoutPage
    };

    if (loading) return <div className="loading-message">Đang tải giỏ hàng...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="cart-container">
            <h2 className="cart-title">Giỏ Hàng Của Bạn</h2>
            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-message">Giỏ hàng của bạn đang trống.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img
                                    className="cart-item-image"
                                    src={`http://127.0.0.1:8000/storage/${item.sanpham.hinh}`}
                                    alt={item.sanpham.tensanpham}
                                />
                                <div className="cart-item-info">
                                    <h3 className="cart-item-title">{item.sanpham.tensanpham}</h3>
                                    <p className="cart-item-price">
                                        Giá: {item.sanpham.gia.toLocaleString('vi-VN')} VNĐ
                                    </p>
                                    <div className="cart-item-quantity">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleUpdateQuantity(item.id, item.so_luong - 1)}
                                            disabled={item.so_luong <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.so_luong}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleUpdateQuantity(item.id, item.so_luong + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <p className="cart-item-total">
                                    Thành tiền: {(item.sanpham.gia * item.so_luong).toLocaleString('vi-VN')} VNĐ
                                </p>
                                <button
                                    className="cart-item-remove"
                                    onClick={() => handleDeleteItem(item.id)}
                                >
                                    🗑
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-summary">
                        <h3>Tổng cộng</h3>
                        <p className="cart-total">
                            {calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </p>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Thanh Toán
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
