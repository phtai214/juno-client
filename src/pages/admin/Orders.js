"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import React from "react";
import "../../style/pages/admin/Order.scss";
import moment from 'moment';



export default function Order() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    //const router = useRouter();
    const [view, setView] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [bookingStatus, setBookingStatus] = useState('');
    const [reloadData, setReloadData] = useState(false);
    const userId = bookingDetails?.userId;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/order`);
                const sortedData = response.data.sort((a, b) => b.id - a.id); // Sort by id descending
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

    const handleGenderChange = (value) => {
        setBookingStatus(value);
    };

    const handleUpdate = (order) => {
        const id = order.id;
        console.log("check id >>", id);
        setView(true);
        axios.get(`${apiUrl}/order/${id}`)
            .then(response => {
                setBookingDetails(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch order details:', error);
            });
    };

    const handleUpdateId = (event, order) => {
        event.preventDefault();
        const id = order.id;
        const booking_status = bookingStatus;
        Promise.all([
            axios.put(`${apiUrl}/order/${id}`, { booking_status }),
        ]).then(([putResponse, _]) => {
            setBookingDetails(putResponse.data);
            return axios.post(`${apiUrl}/notificationclient`, {
                userId: userId,
                bookingId: id,
                message: `The customer has just created a new order ${booking_status}`
            });
        }).catch(error => {
            console.error('Failed to fetch order details:', error);
        });
    };

    const handleDelete = (order) => {
        axios
            .delete(`${apiUrl}/order/${order.id}`)
            .then((response) => {
                console.log('Tour deleted successfully');
                const updatedData = data.filter((item) => item.id !== order.id);
                setData(updatedData);
            })
            .catch((error) => {
                console.error('Failed to delete tour:', error);
            });
    };

    return (
        <>
            {!view && (
                <div className="order-container">
                    <h2 className="orderTitle">Order</h2>
                    <Link href="/dashboard/orders/create">
                        <button className="btn-create">Create new order</button>
                    </Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tour Name</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Start Day</th>
                                <th>Payment Status</th>
                                <th>Order Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((order, index) => (
                                <tr className="order-item" key={index}>
                                    <td>{order.tour_name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.name}</td>
                                    <td>{moment(order.start_day).format('YYYY-MM-DD')}</td>
                                    <td>{order.payment_status ? 'Payment success' : 'Payment in cash'}</td>
                                    <td>
                                        <div className={`order-status-${order.booking_status.toLowerCase()}`}>
                                            {order.booking_status}
                                        </div>
                                    </td>
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
            )}
            {view && (
                <div className="view-container">
                    <h2>Order Update</h2>
                    {bookingDetails && (
                        <div>
                            <p><strong>Tour Name:</strong> <i>{bookingDetails.tour_name}</i></p>
                            <p><strong>Email:</strong> <i>{bookingDetails.email}</i></p>
                            <p><strong>Name:</strong> <i>{bookingDetails.name}</i></p>
                            <p><strong>Number of people:</strong> <i>{bookingDetails.people}</i></p>
                            <p><strong>Phone Number:</strong> <i>{bookingDetails.phone_number}</i></p>
                            <p><strong>Start Day:</strong> <i>{moment(bookingDetails.start_day).format('YYYY-MM-DD')}</i></p>
                            <p><strong>Payment Status:</strong> <i>{bookingDetails.payment_status ? 'Payment success' : 'Payment in cash'}</i></p>

                            <button className="sub-update" onClick={(event) => handleUpdateId(event, bookingDetails)}>Update</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}