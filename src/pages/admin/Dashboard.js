import React from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-content">
                <div className="dashboard-item">
                    <h2>Tổng số sản phẩm</h2>
                    <p>120</p>
                </div>
                <div className="dashboard-item">
                    <h2>Tổng số đơn hàng</h2>
                    <p>45</p>
                </div>
                <div className="dashboard-item">
                    <h2>Tổng số nhân viên</h2>
                    <p>10</p>
                </div>
                <div className="dashboard-item">
                    <h2>Doanh thu tháng</h2>
                    <p>500,000,000 VND</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
