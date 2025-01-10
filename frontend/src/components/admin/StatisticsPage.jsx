import React, { useState } from 'react';
import { fetchStatistics } from '../../services/api';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import '../css/StatisticsPage.css';

const StatisticsPage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchStatistics = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchStatistics({ start_date: startDate, end_date: endDate });
            setStatistics(response.data);
        } catch (err) {
            setError('Không thể tải dữ liệu thống kê.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="statistics-page">
            <Typography variant="h4" gutterBottom className="statistics-title">
                Thống Kê
            </Typography>
            <Grid container spacing={3} className="filter-container">
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="date"
                        label="Từ ngày"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="date"
                        label="Đến ngày"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFetchStatistics}
                        fullWidth
                    >
                        Lấy Dữ Liệu Thống Kê
                    </Button>
                </Grid>
            </Grid>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {statistics && (
                <Grid container spacing={3} className="statistics-results">
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Tổng Doanh Thu</Typography>
                                <Typography variant="h4">
                                    {statistics.totalRevenue.toLocaleString('vi-VN')} VNĐ
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Tổng Số Đơn Hàng</Typography>
                                <Typography variant="h4">{statistics.totalOrders}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Tổng Sản Phẩm Đã Bán</Typography>
                                <Typography variant="h4">{statistics.totalProductsSold}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default StatisticsPage;
