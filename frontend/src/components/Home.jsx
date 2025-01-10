import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Pagination, Button, Select, MenuItem } from '@mui/material';
import axios from '../services/api';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const [priceRange, setPriceRange] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        fetchManufacturers();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products');
            console.log('Products:', response.data); // Kiểm tra dữ liệu trả về
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchManufacturers = async () => {
        try {
            const response = await axios.get('/manufacturers');
            setManufacturers(response.data);
        } catch (error) {
            console.error('Error fetching manufacturers:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleCardClick = (id) => {
        navigate(`/home/product/${id}`);
    };

    const filterByPrice = (range) => {
        setPriceRange(range);
        let filtered = [...products];
        if (range === '0-5') {
            filtered = filtered.filter(product => product.gia >= 0 && product.gia <= 5000000);
        } else if (range === '5-10') {
            filtered = filtered.filter(product => product.gia > 5000000 && product.gia <= 10000000);
        } else if (range === '10-20') {
            filtered = filtered.filter(product => product.gia > 10000000 && product.gia <= 20000000);
        }
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset về trang đầu tiên
    };

    const handleManufacturerChange = (event) => {
        setSelectedManufacturer(event.target.value);
        const filtered = products.filter(product => 
            product.nhasanxuat?.tennhasanxuat === event.target.value
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };
    
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        const filtered = products.filter(product => 
            product.loaisanpham?.tenloai === event.target.value
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
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

            {/* Filters */}
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                {/* Lọc theo khoảng giá */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ marginBottom: '8px' }}>Lọc theo giá:</Typography>
                    <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Button variant={priceRange === '0-5' ? 'contained' : 'outlined'} onClick={() => filterByPrice('0-5')}>0 - 5 triệu</Button>
                        <Button variant={priceRange === '5-10' ? 'contained' : 'outlined'} onClick={() => filterByPrice('5-10')}>5 - 10 triệu</Button>
                        <Button variant={priceRange === '10-20' ? 'contained' : 'outlined'} onClick={() => filterByPrice('10-20')}>10 - 20 triệu</Button>
                    </Box>
                </Grid>

                {/* Lọc theo nhà sản xuất */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ marginBottom: '8px' }}>Nhà sản xuất:</Typography>
                    <Select
                        value={selectedManufacturer}
                        onChange={handleManufacturerChange}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="">Bộ lọc</MenuItem>
                        {manufacturers.map((manufacturer) => (
                            <MenuItem key={manufacturer.manhasanxuat} value={manufacturer.tennhasanxuat}>
                                {manufacturer.tennhasanxuat}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                {/* Lọc theo thể loại */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ marginBottom: '8px' }}>Thể loại:</Typography>
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="">Bộ lọc</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.maloai} value={category.tenloai}>
                                {category.tenloai}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>

            {/* Product Cards */}
            <Grid container spacing={3}>
                {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.masanpham}>
                        <Card
                            className="product-card"
                            onClick={() => handleCardClick(product.masanpham)}
                            sx={{ cursor: 'pointer' }}
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
                    count={Math.ceil(filteredProducts.length / productsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default Home;
