// src/components/common/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../style/components/common/Header.scss";
import SearchBar from "./SearchBar";
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CartHeader from "./CartHeader";
import { useDispatch } from 'react-redux';
import { addItem, updateCartCount } from '../../redux/slices/cartSlice';
const Header = () => {
    const dispatch = useDispatch();
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || false);
    const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        savedCartItems.forEach(item => {
            dispatch(addItem(item));
        });
        dispatch(updateCartCount(savedCartItems.length)); // Cập nhật số lượng giỏ hàng
    }, [dispatch]);

    const cartCount = useSelector((state) => state.cart.count);

    const toggleCart = () => {

        setCart(true);
    };

    const handleLogout = () => {
        console.log('Đăng xuất');
        localStorage.removeItem('isLoggedIn');
        navigate('/customer/sale-thuong-thuong');
    };

    const handleViewAccount = () => {
        navigate(`/customer/user-view/${userId}`);
    };

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <>
            <header className="bg-light">
                <div className="free-ship">
                    <p className="free-ship-content">Miễn phí giao hàng đơn từ 300k</p>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-nav">
                        <div className="box-nav row">
                            <div className="col-md-1 logo-container">
                                <Link className="navbar-brand" to="/customer/home">
                                    <img src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729458521/logo-juno-Photoroom_odhvyp.png" alt="Logo" className="logo" />
                                </Link>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse col-md-11" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/customer/new-product">Hàng Mới</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link" to="/customer/product-all">Sản Phẩm</Link>
                                        <ul className="sub-menu megaMenu">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6 sub-menu-data">
                                                        <Link className="nav-menu-link" to="/customer/product/PHU-KIEN">Túi</Link>
                                                        <ul>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/xang-dan">Túi cỡ nhỏ</Link></li>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/cao-got">Túi cỡ trung </Link></li>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/sneaker">Túi cỡ lớn</Link></li>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/bup-be">Balo</Link></li>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/dep-guoc">ví - Clutch</Link></li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 sub-menu-data">
                                                        <Link className="nav-menu-link" to="/customer/product/BST">Bộ Sưu Tập</Link>
                                                        <ul>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/BST/xang-dan">Moda Feminia</Link></li>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/BST/cao-got">Golden Hour</Link></li>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/BST/sneaker">Autumn Knit</Link></li>
                                                            <li><Link className="nav-menu-link-item" to="/customer/product/BST/bup-be">Back To Cool</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link hightlight" to="/customer/sale-thuong-thuong">SALE Thương Thương</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">SHOWROOM</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    <li className="search-box-container">
                                        <SearchBar />
                                    </li>
                                    <li className="nav-item end-nav">
                                        {isLoggedIn ? (
                                            <Dropdown>
                                                <Dropdown.Toggle className="nav-link" id="user-dropdown">
                                                    <img className="user-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729716444/user_456212_rcmnpi.png" />  {user.name || 'User'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={handleViewAccount}>Xem chi tiết tài khoản</Dropdown.Item>
                                                    <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        ) : (
                                            <div className="nav-link" onClick={handleClick}>
                                                <img className="user-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729716444/user_456212_rcmnpi.png" />
                                            </div>
                                        )}
                                        <div className="nav-link" onClick={toggleCart}>
                                            <img className="user-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729715844/trolley_3743596_qrqu7i.png" />
                                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* Hiển thị số lượng giỏ hàng */}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {cart && <CartHeader setCart={setCart} isOpen={cart} />}
        </>
    );
};

export default Header;