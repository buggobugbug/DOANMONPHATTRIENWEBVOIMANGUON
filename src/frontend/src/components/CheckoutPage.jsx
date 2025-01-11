import React, { useState, useEffect } from 'react';
import { fetchCart, postCheckout, getCsrfToken } from '../services/api';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Divider,
    CircularProgress,
    Alert,
} from '@mui/material';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkoutData, setCheckoutData] = useState({
        hotenkhachhang: '',
        sdtkhachhang: '',
        diachigiaohang: '',
        tongtien: 0,
        ghichu: '',
    });

    useEffect(() => {
        const loadCart = async () => {
            try {
                await getCsrfToken();
                const response = await fetchCart();
                setCartItems(response.data);

                const totalPrice = response.data.reduce(
                    (total, item) => total + item.sanpham.gia * item.so_luong,
                    0
                );
                setCheckoutData((prevData) => ({ ...prevData, tongtien: totalPrice }));
            } catch (err) {
                setError('Không thể tải giỏ hàng.');
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCheckoutData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckout = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            await postCheckout({ ...checkoutData, makhachhang: user.ma_nguoi_dung });
            alert('Thanh toán thành công!');
            setCartItems([]);
        } catch (err) {
            console.error(err);
            alert('Lỗi trong quá trình thanh toán. Vui lòng thử lại.');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container className="checkout-container">
            <Typography variant="h4" gutterBottom className="checkout-title">
                Thanh Toán
            </Typography>

            <Grid container spacing={3}>
                {/* Hiển thị sản phẩm trong giỏ hàng */}
                <Grid item xs={12} md={8} className="cart-items-container">
                    {cartItems.length > 0 ? (
                        <Paper className="cart-items-list">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item-row">
                                    <div className="cart-item-image-container">
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${item.sanpham.hinh}`}
                                            alt={item.sanpham.tensanpham}
                                            className="cart-item-image"
                                        />
                                    </div>
                                    <div className="cart-item-details">
                                        <Typography variant="h6" className="cart-item-title">
                                            {item.sanpham.tensanpham}
                                        </Typography>
                                        <Typography className="cart-item-price">
                                            Giá: {item.sanpham.gia.toLocaleString('vi-VN')} VNĐ
                                        </Typography>
                                        <Typography className="cart-item-quantity">
                                            Số lượng: {item.so_luong}
                                        </Typography>
                                        <Typography className="cart-item-total">
                                            Thành tiền: {(item.sanpham.gia * item.so_luong).toLocaleString('vi-VN')} VNĐ
                                        </Typography>
                                    </div>
                                    <Divider className="cart-item-divider" />
                                </div>
                            ))}
                        </Paper>
                    ) : (
                        <Typography variant="h6">Giỏ hàng của bạn đang trống.</Typography>
                    )}
                </Grid>

                {/* Form thông tin thanh toán */}
                <Grid item xs={12} md={4} className="checkout-form">
                    <Typography variant="h5" gutterBottom className="form-title">
                        Thông Tin Khách Hàng
                    </Typography>
                    <TextField
                        fullWidth
                        label="Họ tên khách hàng"
                        name="hotenkhachhang"
                        value={checkoutData.hotenkhachhang}
                        onChange={handleInputChange}
                        margin="normal"
                        className="form-input"
                    />
                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="sdtkhachhang"
                        value={checkoutData.sdtkhachhang}
                        onChange={handleInputChange}
                        margin="normal"
                        className="form-input"
                    />
                    <TextField
                        fullWidth
                        label="Địa chỉ giao hàng"
                        name="diachigiaohang"
                        value={checkoutData.diachigiaohang}
                        onChange={handleInputChange}
                        margin="normal"
                        className="form-input"
                    />
                    <TextField
                        fullWidth
                        label="Ghi chú"
                        name="ghichu"
                        value={checkoutData.ghichu}
                        onChange={handleInputChange}
                        margin="normal"
                        className="form-input"
                    />
                    <Typography variant="h6" gutterBottom className="total-price">
                        Tổng Tiền: {checkoutData.tongtien.toLocaleString('vi-VN')} VNĐ
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCheckout}
                        className="checkout-btn"
                    >
                        Thanh Toán
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CheckoutPage;
