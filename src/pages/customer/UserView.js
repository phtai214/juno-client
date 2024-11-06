import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../style/pages/customer/UserView.scss";
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import moment from 'moment';

const UserView = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const user_id = id;
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const inputFileRef = useRef(null);
    const dispatch = useDispatch();
    const [updateUserMessage, setUpdateUserMessage] = useState('');
    const [noUpdateUserMessage, setNoUpdateUserMessage] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [validation, setValidation] = useState(false);
    const [orders, setOrders] = useState([]);

    // Fetch user data from API
    const fetchData = () => {
        if (id) {
            axios.get(`http://localhost:3001/api/v1/user/${id}`)
                .then(response => {
                    setUser(response.data);
                    setName(response.data.name || '');
                    setEmail(response.data.email || '');
                    setPhoneNumber(response.data.phonenumber || '');
                    setAddress(response.data.address || '')
                })
                .catch(error => {
                    console.error('Error fetching user information:', error);
                });
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData when component mounts
    }, [id]);

    // Handle image upload
    const handleImageClick = () => {
        inputFileRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch({ type: "SET_SELECTED_IMAGE", payload: reader.result });
            };
            reader.readAsDataURL(file);
            setAvatar(file);
        }
    };

    // Handle input changes
    const handleNameChange = (e) => setName(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    // Validation schema
    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup
            .string()
            .matches(
                /^[\w.%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|protonmail\.com|mail\.ru|web\.de|usa\.com)$/,
                'Invalid email'
            )
            .required('Email is required'),
        phonenumber: yup
            .string()
            .matches(/^\d{7,11}$/, 'Invalid phone number')
            .required('Phone number is required'),
    });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate({ name, email, phonenumber, address }, { abortEarly: false });

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phonenumber', phonenumber);
            formData.append('address', address);
            if (avatar) {
                formData.append('image', avatar);
            }

            // Log FormData
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            // Gửi yêu cầu PUT
            const response = await axios.put(`http://localhost:3001/api/v1/user/${id}`, formData);
            console.log('Response:', response.data);

            dispatch({ type: "CLEAR_SELECTED_IMAGE" });
            setUpdateUserMessage('Update successful!');
            setAlertVariant('success');
            setShowAlert(true);
            fetchData(); // Reload user data after update

            // Reset fields
            setName('');
            setEmail('');
            setPhoneNumber('');
            setAddress('');
        } catch (error) {
            console.error('Error:', error);
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.map((err) => err.message);
                setUpdateUserMessage('Validation error: ' + validationErrors.join(', '));
                setAlertVariant('danger');
                setValidation(true);
            } else {
                setUpdateUserMessage('An error occurred while updating the user.');
                setAlertVariant('danger');
                setNoUpdateUserMessage(true);
            }
        }
    };
    useEffect(() => {
        const fetchOrdersAndItems = async () => {
            try {
                if (user_id) {
                    const ordersResponse = await axios.get(`http://localhost:3001/api/v1/order/users/${user_id}`);
                    const orders = ordersResponse.data;

                    // Lặp qua từng đơn hàng để lấy thông tin sản phẩm
                    const ordersWithItems = await Promise.all(orders.map(async (order) => {
                        const orderItemsResponse = await axios.get(`http://localhost:3001/api/v1/orderItem/order/${order.id}`);
                        const orderItems = orderItemsResponse.data;

                        // Lặp qua từng orderItem để lấy đánh giá
                        const orderItemsWithReviews = await Promise.all(orderItems.map(async (item) => {
                            const productId = item.variation.product.id; // Lấy productId

                            // Lọc các đánh giá có user_id = user_id

                            return {
                                ...item,
                            };
                        }));

                        return {
                            ...order,
                            orderItems: orderItemsWithReviews, // Cập nhật orderItems với đánh giá đã lọc
                        };
                    }));

                    setOrders(ordersWithItems); // Cập nhật state với đơn hàng và sản phẩm
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrdersAndItems();
    }, [user_id]);

    const formatPrice = (price) => {
        const amount = parseFloat(price);
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'VND' }).replace('₫', '').trim() + ' VND';
    };
    return (

        <>
            <form className="user-container" onSubmit={handleSubmit}>
                {user ? (
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="ava-header">
                                <div className="image">
                                    <img src={avatar ? URL.createObjectURL(avatar) : user?.avatar} alt={user?.name} className="avatar" />
                                    <img className="icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1730860156/camera_685655_bspmgz.png" onClick={handleImageClick} />
                                    <input ref={inputFileRef} type="file" name="image" style={{ display: 'none' }} onChange={handleImageChange} />
                                </div>
                                <div className="name">
                                    <h2>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name} // Sử dụng value để đồng bộ với state
                                            onChange={handleNameChange}
                                        />
                                    </h2>
                                </div>
                            </div>
                            <div className="email">
                                <h5>Email:</h5>
                                <input
                                    type="text"
                                    name="email"
                                    value={email} // Sử dụng value để đồng bộ với state
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="phone-number">
                                <h5>Phone number:</h5>
                                <input
                                    type="text"
                                    name="phonenumber"
                                    value={phonenumber} // Sử dụng value để đồng bộ với state
                                    onChange={handlePhoneNumberChange}
                                />
                            </div>
                            <div className="email">
                                <h5>Address:</h5>
                                <input
                                    type="text"
                                    name="address"
                                    value={address} // Sử dụng value để đồng bộ với state
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <button className="btn" type="submit">Save</button>
                        </div>
                        {showAlert && (
                            <div className="col-sm-2">
                                <div className="successful">
                                    <div className="Update"> Update successful </div>
                                    <button onClick={() => setShowAlert(false)}>ok</button>
                                </div>
                            </div>
                        )}
                        {noUpdateUserMessage && (
                            <div className="col-sm-3">
                                <div className="successful">
                                    <div className="Update"> There are no changes to update </div>
                                    <button onClick={() => setNoUpdateUserMessage(false)}>ok</button>
                                </div>
                            </div>
                        )}
                        {validation && (
                            <div className="col-sm-3">
                                <div className="successful">
                                    <div className="Update"> Validation error </div>
                                    <button onClick={() => setValidation(false)}>ok</button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </form>
            <div className="purchase-history">
                <h3 className="purchase-history-title">
                    Lịch sử mua hàng
                </h3>
                {orders.length > 0 ? (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th className="table-header">Id đơn hàng</th>
                                <th className="table-header">Giá trị đơn hàng</th>
                                <th className="table-header">Trạng thái giao hàng</th>
                                <th className="table-header">Thời gian đặt hàng</th>
                                <th className="table-header">Sản phẩm</th> {/* Cột sản phẩm */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="order-row">
                                    <td className="order-id">{order.id}</td>
                                    <td className="order-total">{formatPrice(order.total_amount)}</td>
                                    <td className="order-status">{order.status}</td>
                                    <td className="order-created-at">{moment(order.created_at).format('HH:mm - DD-MM-YYYY')}</td>
                                    <td className="order-items">
                                        {order.orderItems && order.orderItems.length > 0 ? (
                                            order.orderItems.map(item => (
                                                <div key={item.id} className="order-item">
                                                    <p>Product Name: {item.variation.product.name}</p>
                                                    <p>Quantity: {item.quantity}</p>
                                                    {/* Hiển thị các thông tin khác về sản phẩm nếu cần */}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No items found.</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </>
    );
};

export default UserView;