"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../../style/pages/admin/Order.scss";
import moment from 'moment';

export default function Orders() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/order`);
                const sortedData = response.data.orders.sort((a, b) => b.id - a.id);
                setData(sortedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [reloadData]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleUpdate = (order) => {
        // Chuyển hướng đến trang cập nhật đơn hàng
        window.location.href = `orders/update/${order.id}`; // Thay đổi đường dẫn tương ứng với cấu trúc của bạn
    };

    const handleDelete = (order) => {
        axios
            .delete(`http://localhost:3001/api/v1/order/${order.id}`)
            .then((response) => {
                console.log('Order deleted successfully');
                const updatedData = data.filter((item) => item.id !== order.id);
                setData(updatedData);
            })
            .catch((error) => {
                console.error('Failed to delete order:', error);
            });
    };

    return (
        <div className="order-container">
            <h2 className="orderTitle">Order</h2>
            <Link to="/dashboard/orders/create">
                <button className="btn-create">Create new order</button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Địa chỉ</th>
                        <th>Name</th>
                        <th>Start Day</th>
                        <th>Payment Method</th>
                        <th>Order Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((order, index) => (
                        <tr className="order-item" key={index}>
                            <td>{order.shipping_address}</td>
                            <td>{order.user.name}</td>
                            <td>{moment(order.start_day).format('YYYY-MM-DD')}</td>
                            <td>{order.payment_method}</td>
                            <td>{order.status}</td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(order)}>
                                    Delete
                                </button>
                                <button className="update" onClick={() => handleUpdate(order)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination">
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                    <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                        <button className="pagi-btn" onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}