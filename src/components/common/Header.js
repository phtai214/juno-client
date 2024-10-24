// src/components/common/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Đảm bảo đã import CSS của Bootstrap
import "../../style/components/common/Header.scss";
import SearchBar from "./SearchBar";
import { Dropdown } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
const Header = () => {
    const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store

    // Kiểm tra xem người dùng đã đăng nhập chưa
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleLogout = () => {
        console.log('Đăng xuất');
        localStorage.removeItem('isLoggedIn'); // Xóa cookie
        navigate('/customer/sale-thuong-thuong'); // Chuyển hướng về trang mong muốn
    };
    const handleViewAccount = () => {
        // Logic để xem chi tiết tài khoản
        console.log('Xem chi tiết tài khoản');
    };
    const handleClick = () => {
        navigate('/login'); // Chuyển hướng tới "/login"
    };
    return (
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
                                <li className="nav-item dropdown ">
                                    <Link className="nav-link" to="/customer/product">Sản Phẩm</Link>
                                    <ul className="sub-menu megaMenu">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-2 col-sm-2 sub-menu-data">
                                                    <Link className="nav-menu-link" to="/customer/product/GIAY">Giày</Link>
                                                    <ul>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/GIAY/xang-dan">Giày Xăng Đan</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/GIAY/cao-got">Giày Cao Gót</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/GIAY/sneaker">Giày Sneakers</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/GIAY/bup-be">Giày Búp Bê</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/GIAY/dep-guoc">Dép Guốc</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-2 col-sm-2 sub-menu-data">
                                                    <Link className="nav-menu-link" to="/customer/product/TUI">Túi</Link>
                                                    <ul>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/TUI/xang-dan">Giày Xăng Đan</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/TUI/cao-got">Giày Cao Gót</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/TUI/sneaker">Giày Sneakers</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/TUI/bup-be">Giày Búp Bê</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/TUI/dep-guoc">Dép Guốc</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-2 col-sm-2 sub-menu-data">
                                                    <Link className="nav-menu-link" to="/customer/product/PHU-KIEN">Phụ Kiện</Link>
                                                    <ul>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/xang-dan">Giày Xăng Đan</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/cao-got">Giày Cao Gót</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/sneaker">Giày Sneakers</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/bup-be">Giày Búp Bê</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/PHU-KIEN/dep-guoc">Dép Guốc</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-2 col-sm-2 sub-menu-data">
                                                    <Link className="nav-menu-link" to="/customer/product/QUAN-AO">Quần ÁO</Link>
                                                    <ul>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/QUAN-AO/xang-dan">Giày Xăng Đan</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/QUAN-AO/cao-got">Giày Cao Gót</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/QUAN-AO/sneaker">Giày Sneakers</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/QUAN-AO/bup-be">Giày Búp Bê</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/QUAN-AO/dep-guoc">Dép Guốc</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-2 col-sm-2 sub-menu-data">
                                                    <Link className="nav-menu-link" to="/customer/product/BST">Bộ Sưu Tập</Link>
                                                    <ul>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/BST/xang-dan">Giày Xăng Đan</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/BST/cao-got">Giày Cao Gót</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/BST/sneaker">Giày Sneakers</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/BST/bup-be">Giày Búp Bê</Link></li>
                                                        <li> <Link className="nav-menu-link-item" to="/customer/product/BST/dep-guoc">Dép Guốc</Link></li>
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
                                    <Link className="nav-link hightlight" to="/sale">Quần áo SALE UPTO 50%</Link>
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
                                        // Nếu người dùng đã đăng nhập
                                        <Dropdown>
                                            <Dropdown.Toggle className="nav-link" id="user-dropdown">
                                                <img className="user-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729716444/user_456212_rcmnpi.png" />  {user.name || 'User'} {/* Hiển thị tên người dùng nếu có */}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={handleViewAccount}>Xem chi tiết tài khoản</Dropdown.Item>
                                                <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    ) : (
                                        // Nếu người dùng chưa đăng nhập
                                        <div className="nav-link" onClick={handleClick}><img className="user-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729716444/user_456212_rcmnpi.png" /></div>
                                    )}
                                    <div className="nav-link"><img className="user-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729715844/trolley_3743596_qrqu7i.png" /></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
