import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/admin/Dashboard';
import Home from './components/Home';
import Products from './components/admin/Products';
import CreateProduct from './components/admin/CreateProduct';
import EditProduct from './components/admin/EditProduct';
import Categories from './components/admin/Categories';
import Manufacturers from './components/admin/Manufacturers';
import Users from './components/admin/Users';
import CreateUser from './components/admin/CreateUser';
import EditUser from './components/admin/EditUser'; // Import component EditUser
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute allowedRoles={[1]}>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route path="products" element={<Products />} />
                    <Route path="create" element={<CreateProduct />} />
                    <Route path="edit/:id" element={<EditProduct />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="manufacturers" element={<Manufacturers />} />
                    <Route path="accounts" element={<Users />} />
                    <Route path="create-user" element={<CreateUser />} />
                    <Route path="edit-user/:id" element={<EditUser />} /> {/* Route chỉnh sửa người dùng */}
                </Route>
                <Route
                    path="/home/*"
                    element={
                        <>
                            <Header />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/product/:id" element={<ProductDetail />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/profile" element={<UserProfilePage />} /> {/* Thêm trang thông tin người dùng */}
                            </Routes>
                            <Footer />
                        </>
                    }
                />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
