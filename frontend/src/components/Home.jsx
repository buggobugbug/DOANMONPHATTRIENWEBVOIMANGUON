import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Box, Grid, Typography, Card, CardContent, CardMedia, Pagination } from '@mui/material';
import axios from '../services/api';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const navigate = useNavigate(); // Khởi tạo navigate để điều hướng

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Hàm điều hướng đến chi tiết sản phẩm
    const handleCardClick = (id) => {
        navigate(`/home/product/${id}`);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            {/* Banner */}
            <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
                <img
                    src={require('../assets/images/img_banner1.jpg')}
                    alt="Banner"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
            </Box>

            {/* Title */}
            <Typography variant="h4" fontWeight="bold" color="black" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                XE ĐẠP
            </Typography>

            {/* Product Cards */}
            <Grid container spacing={3}>
                {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.masanpham}>
                        <Card 
                            className="product-card" 
                            onClick={() => handleCardClick(product.masanpham)} // Thêm sự kiện click
                            sx={{ cursor: 'pointer' }} // Con trỏ chuột
                        >
                            <CardMedia
                                component="img"
                                image={`http://127.0.0.1:8000/storage/${product.hinh}`}
                                alt={product.tensanpham}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.tensanpham.toUpperCase()}</Typography>
                                <Typography variant="body2" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                                    Giá: {product.gia.toLocaleString()} VNĐ
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(products.length / productsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default Home;
