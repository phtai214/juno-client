// Ví dụ: src/layouts/CustomerLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const CustomerLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default CustomerLayout; // Đảm bảo xuất khẩu mặc định