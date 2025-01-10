import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, getCsrfToken, addToCart } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                await getCsrfToken();
                const response = await fetchProductById(id);
                setProduct(response.data);
            } catch (err) {
                setError('Không thể tải thông tin sản phẩm.');
            } finally {
                setLoading(false);
            }
        };

        getProductDetail();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await getCsrfToken();
            const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
            const data = {
                manguoidung: user.ma_nguoi_dung, // Đúng tên cột từ backend
                masanpham: product.masanpham,
                so_luong: 1,
            };
            await addToCart(data);
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
            navigate('/home/cart');
        } catch (err) {
            console.error('Lỗi khi thêm vào giỏ hàng:', err.response?.data || err);
            alert('Không thể thêm sản phẩm vào giỏ hàng.');
        }
    };
    
    
    

    if (loading) return <div className="loading-message">Đang tải...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <div className="product-detail-image">
                    <img
                        src={`http://127.0.0.1:8000/storage/${product.hinh}`}
                        alt={product.tensanpham}
                    />
                </div>
                <div className="product-detail-info">
                    <h1 className="product-title">{product.tensanpham.toUpperCase()}</h1>
                    <p className="product-price">
                        {product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                    <p className="product-quantity">Số lượng còn lại: {product.soluong}</p>
                    <p className="product-category">Danh mục: {product.loaisanpham?.tenloai || 'Không rõ'}</p>
                    <p className="product-description">{product.mota}</p>
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                        disabled={product.soluong === 0}
                    >
                        {product.soluong > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
