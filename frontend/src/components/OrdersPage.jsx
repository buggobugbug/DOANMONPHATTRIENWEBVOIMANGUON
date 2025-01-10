import React, { useEffect, useState } from 'react';
import { fetchOrdersByUserId } from '../services/api';
import {
    Container,
    Typography,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import './OrdersPage.css'; // CSS cho trang

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('user')).ma_nguoi_dung; // Lấy userId từ localStorage
                const response = await fetchOrdersByUserId(userId);
                setOrders(response.data);
            } catch (err) {
                setError('Không thể tải danh sách đơn hàng.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <CircularProgress className="loading-spinner" />;
    if (error) return <Alert severity="error" className="error-alert">{error}</Alert>;

    return (
        <Container className="orders-container">
            <Typography variant="h4" gutterBottom className="orders-title">
                Danh Sách Đơn Hàng
            </Typography>

            {orders.length === 0 ? (
                <Alert severity="info" className="no-orders-alert">Bạn chưa có đơn hàng nào.</Alert>
            ) : (
                <TableContainer component={Paper} className="orders-table-container">
                    <Table className="orders-table">
                        <TableHead>
                            <TableRow className="table-header-row">
                                <TableCell className="table-header-cell">Mã Hóa Đơn</TableCell>
                                <TableCell className="table-header-cell">Ngày Lập</TableCell>
                                <TableCell className="table-header-cell">Trạng Thái</TableCell>
                                <TableCell className="table-header-cell">Chi Tiết Đơn Hàng</TableCell>
                                <TableCell align="right" className="table-header-cell">Tổng Tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.mahoadon} className="table-body-row">
                                    <TableCell className="table-body-cell">{order.mahoadon}</TableCell>
                                    <TableCell className="table-body-cell">{new Date(order.ngaylap).toLocaleDateString('vi-VN')}</TableCell>
                                    <TableCell className="table-body-cell">{order.trangthaihoadon}</TableCell>
                                    <TableCell className="table-body-cell">
                                        {order.chitiethoadon.map((detail) => (
                                            <div key={detail.machitiethoadon} className="order-detail">
                                                <Typography className="order-detail-product">
                                                    {detail.sanpham.tensanpham} - {detail.soluongSP} x {detail.giatienSP.toLocaleString('vi-VN')} VNĐ
                                                </Typography>
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell align="right" className="table-body-cell">
                                        {order.tongtien.toLocaleString('vi-VN')} VNĐ
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default OrdersPage;
