// src/layouts/AdminLayout.js
import React from 'react';
import { Outlet, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccessDenied from '../components/common/AccessDenied'; // Import component thông báo truy cập

const ProtectedRoute = ({ element }) => {
    const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux
    const isAdmin = user.role === 'admin'; // Kiểm tra vai trò của người dùng

    return isAdmin ? element : <AccessDenied />; // Nếu không phải admin, hiển thị thông báo
};

const AdminLayout = () => {
    return (
        <div>
            <main>
                <ProtectedRoute element={<Outlet />} /> {/* Kiểm tra quyền truy cập trước khi hiển thị Outlet */}
            </main>
        </div>
    );
};

export default AdminLayout; // Đảm bảo xuất khẩu mặc định
