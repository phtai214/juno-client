import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Import custom Axios instance
import { loginSuccess, loginFailure } from '../../redux/slices/authSlice'; // Redux actions
import { setUser } from '../../redux/slices/userSlice'; // Import action từ userSlice
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../../style/components/common/login.scss";

const LoginComponent = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/auth/login`, {
                email: credentials.email,
                password: credentials.password,
            });
            const user = response.data.user;
            const { id, name, role } = user;

            // Save user data to localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', id);
            localStorage.setItem('userRole', role);

            // Dispatch login success actions
            dispatch(loginSuccess(response.data)); // Chuyển trạng thái login
            dispatch(setUser(user)); // Đặt thông tin người dùng

            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else if (role === 'user') {
                navigate('/customer/home');
            } else if (role === 'employee') {
                navigate('/employee/dashboard');
            }
        } catch (error) {
            console.error('Login Error:', error);
            console.log('Axios config:', error.config);
            setErrorMessage('Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.');
            dispatch(loginFailure(error.message)); // Dispatch action nếu đăng nhập thất bại
        }
    };


    return (
        <div className="login-container">
            <h1 className="login-container-title">Đăng Nhập</h1>
            <i className="login-container-note">
                Đăng nhập để tích điểm và hưởng ưu đãi thành viên khi mua hàng. Nhập số điện thoại để tiếp tục đăng nhập hoặc đăng ký thành viên.
            </i>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="email"
                    className="phoneInput"
                    placeholder="Vui lòng nhập email của bạn"
                    autoComplete="off"
                    value={credentials.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className="passwordInput"
                    placeholder="Nhập mật khẩu của bạn"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="btn-login">Tiếp tục</button>
            </form>
            <p className="item-login">Hoặc đăng nhập với</p>
            <div className="box-login-fb-gg">
                <button className='btn-login-fb'>
                    <img className="fb-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729519358/facebook_2504903_geuvj2.png" alt="Facebook Login" />
                </button>
                <button className='btn-login-fb'>
                    <img className="fb-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729519358/google_2504914_pe1zmv.png" alt="Google Login" />
                </button>
            </div>
            <p className="item-login-data">
                Bằng việc đăng nhập, bạn đã đồng ý với Điều khoản dịch vụ & chính sách bảo mật của Juno
            </p>
            <Link className="link-register" to="/register">Chưa có tài khoản đăng ký tại đây</Link>
        </div>
    );
};

export default LoginComponent;
