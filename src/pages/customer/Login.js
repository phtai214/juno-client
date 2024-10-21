import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions'; // Nhập action từ file actions
import "../../style/components/common/login.scss"
const LoginComponent = () => {
    const dispatch = useDispatch();

    const handleLogin = (credentials) => {
        dispatch(login(credentials)); // Gọi action login
    };

    return (
        <div className="login-container">
            <h1 className="login-container-title">Đăng Nhập</h1>
            <i className="login-container-note">Đăng nhập để tích điểm và hưởng ưu đãi thành viên khi mua hàng. Nhập số điện thoại để tiếp tục đăng nhập hoặc đăng ký thành viên.</i>
            <input type="text"
                name="sdt"
                className="phoneInput"
                placeholder="Vui lòng nhập số điện thoại của bạn"
                autoComplete="off" />
            <button className="btn-login">Tiếp tục</button>
            <p className="item-login">Hoặc đăng nhập với</p>
            <div className="box-login-fb-gg">
                <button className='btn-login-fb'><img className="fb-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729519358/facebook_2504903_geuvj2.png" /></button>
                <button className='btn-login-fb'><img className="fb-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729519358/google_2504914_pe1zmv.png" /></button>
            </div>
            <p className="item-login-data">Bằng việc đăng nhập, bạn đã đồng ý với Điều khoản dịch vụ & chính sách bảo mật của Juno</p>
        </div>
    );
};

export default LoginComponent;
