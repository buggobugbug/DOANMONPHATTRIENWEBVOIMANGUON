import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/admin/Dashboard';
import Home from './components/Home';
import Products from './components/admin/Products';
import CreateProduct from './components/admin/CreateProduct';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route đăng nhập */}
                <Route path="/login" element={<Login />} />

                {/* Route đăng ký */}
                <Route path="/register" element={<Register />} />

                {/* Route Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute allowedRoles={[1]}>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    {/* Route con cho sản phẩm */}
                    <Route path="products" element={<Products />} />
                    <Route path="create" element={<CreateProduct />} />
                </Route>

                {/* Route Home */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute allowedRoles={[2]}>
                            <Home />
                        </PrivateRoute>
                    }
                />

                {/* Route mặc định */}
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
