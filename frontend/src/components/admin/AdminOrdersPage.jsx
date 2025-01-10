import React, { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus } from '../../services/api'; // Import API service
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    CircularProgress,
    Alert,
} from '@mui/material';
import '../css/AdminOrdersPage.css'; // Import CSS

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await fetchOrders(); // Lấy danh sách tất cả đơn hàng
            setOrders(response.data);
        } catch (err) {
            setError('Không thể tải danh sách đơn hàng.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, { trangthaihoadon: newStatus });
            alert('Cập nhật trạng thái thành công!');
            loadOrders(); // Refresh lại danh sách đơn hàng
        } catch (err) {
            console.error('Error updating status:', err.response?.data);
            alert('Lỗi khi cập nhật trạng thái.');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container className="orders-page">
            <Typography variant="h4" gutterBottom className="orders-title">
                Quản Lý Đơn Hàng
            </Typography>
            <TableContainer component={Paper} className="orders-table-container">
                <Table className="orders-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã Hóa Đơn</TableCell>
                            <TableCell>Họ Tên Khách Hàng</TableCell>
                            <TableCell>Số Điện Thoại</TableCell>
                            <TableCell>Địa Chỉ Giao Hàng</TableCell>
                            <TableCell>Ngày Lập</TableCell>
                            <TableCell>Trạng Thái</TableCell>
                            <TableCell>Chi Tiết Đơn Hàng</TableCell>
                            <TableCell>Tổng Tiền</TableCell>
                            <TableCell>Ghi Chú</TableCell>
                            <TableCell>Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.mahoadon} className="order-row">
                                <TableCell>{order.mahoadon}</TableCell>
                                <TableCell>{order.hotenkhachhang}</TableCell>
                                <TableCell>{order.sdtkhachhang}</TableCell>
                                <TableCell>{order.diachigiaohang}</TableCell>
                                <TableCell>{new Date(order.ngaylap).toLocaleDateString('vi-VN')}</TableCell>
                                <TableCell>
                                    <Select
                                        value={order.trangthaihoadon}
                                        onChange={(e) => handleStatusChange(order.mahoadon, e.target.value)}
                                        className="status-select"
                                    >
                                        <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                                        <MenuItem value="Đã giao hàng">Đã giao hàng</MenuItem>
                                        <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    {order.chitiethoadon.map((detail) => (
                                        <div key={detail.machitiethoadon}>
                                            {detail.sanpham.tensanpham} - Số lượng: {detail.soluongSP}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>{order.tongtien.toLocaleString('vi-VN')} VNĐ</TableCell>
                                <TableCell>{order.ghichu || 'Không có ghi chú'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleStatusChange(order.mahoadon, 'Đã hủy')}
                                        className="cancel-button"
                                    >
                                        Hủy Đơn
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminOrdersPage;
