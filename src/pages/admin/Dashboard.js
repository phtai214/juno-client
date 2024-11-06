import React from 'react';
import "../../style/pages/admin/Dashboard.scss"
import AnalyticsCard from "../../components/Admin/AnalyticsCard";
import OrderAnalyticsCard from "../../components/Admin/OrderAnalyticsCard";
import RevenueAnalyticsCard from '../../components/Admin/RevenueAnalyticsCard';
import ReviewAnalyticsCard from "../../components/Admin/ReviewAnalyticsCard"
import "../../style/components/admin/AnalyticsCard.scss";
import Chart from "../../components/Admin/Chart";
import Transactions from "../../components/Admin/transactions"
const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h3 className="dashboard-title">Hi, Welcome back</h3>
            <div className="dashboard-content">
                <div className="dashboard-item">
                    <AnalyticsCard />
                    <OrderAnalyticsCard />
                    <RevenueAnalyticsCard />
                    <ReviewAnalyticsCard />
                </div>
                <Transactions />
                <Chart />
            </div>
        </div>
    );
};

export default Dashboard;
