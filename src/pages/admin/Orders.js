import React from 'react';

const Orders = () => {
    // Giả định bạn có một mảng đơn hàng
    const orders = [
        { id: 1, customer: 'Nguyễn Văn A', total: 300000, status: 'Đang xử lý' },
        { id: 2, customer: 'Trần Thị B', total: 450000, status: 'Đã giao' },
        { id: 3, customer: 'Lê Văn C', total: 150000, status: 'Đã hủy' },
    ];

    return (
        <div className="orders-page">
            <h1>Quản lý đơn hàng</h1>
            {orders.length === 0 ? (
                <p>Không có đơn hàng nào.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.total.toLocaleString()} VND</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Thêm các chức năng quản lý đơn hàng, như chỉnh sửa, xóa, xem chi tiết đơn hàng */}
        </div>
    );
};

export default Orders;
