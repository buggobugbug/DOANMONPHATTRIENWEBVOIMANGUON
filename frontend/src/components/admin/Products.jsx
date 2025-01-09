import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts(); // Refresh product list
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Quản lý sản phẩm</h1>
            <Link to="/dashboard/create" className="btn btn-primary mb-3">
                Thêm sản phẩm mới
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Mô tả</th>
                        <th>Hình ảnh</th>
                        <th>Loại sản phẩm</th>
                        <th>Nhà sản xuất</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.masanpham}>
                            <td>{product.masanpham}</td>
                            <td>{product.tensanpham}</td>
                            <td>{product.gia}</td>
                            <td>{product.soluong}</td>
                            <td>{product.mota}</td>
                            <td>
                                {product.hinh && (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${product.hinh}`}
                                        alt={product.tensanpham}
                                        style={{ width: "100px", height: "auto" }}
                                    />
                                )}
                            </td>
                            <td>{product.loaisanpham?.tenloai || "Không xác định"}</td>
                            <td>{product.nhasanxuat?.tennhasanxuat || "Không xác định"}</td>
                            <td>
                                <Link
                                    to={`/dashboard/edit/${product.masanpham}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Sửa
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(product.masanpham)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
