import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import "../../style/components/common/register.scss"
const Register = () => {
    const dispatch = useDispatch();

    const handleRegister = (userData) => {
        dispatch(login(userData)); // Gọi action login
    };

    return (
        <div className="signup-container">
            <h1 className="signup-container-title">Đăng Ký Thành Viên</h1>
            <i className="signup-container-note">Chỉ cần vài bước đăng ký để tận hưởng nhiều quyền lợi hơn khi mua sản phẩm. Tham gia hội thành viên Juno ngay hôm nay bạn nhé!</i>
            <form className="form-box">
                <div className="mb-3">
                    <label for="name" className="form-label">Họ (*)</label>
                    <input type="text" className="form-control" id="ho" placeholder="" />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Tên <span className="highlight">*</span></label>
                    <input type="email" className="form-control" id="name" placeholder="" />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="" />
                </div>
                <div className="mb-3">
                    <label for="birthdate" className="form-label">Ngày Sinh</label>
                    <input type="date" className="form-control" id="birthdate" placeholder="" />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Mật Khẩu<span className="highlight">*</span></label>
                    <input type="password" className="form-control" id="password" placeholder="" />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Nhập Lại Mật Khẩu<span className="highlight">*</span></label>
                    <input type="password" className="form-control" id="password" placeholder="" />
                </div>

                <div class="mb-3">
                    <input type="checkbox" id="subscribe" name="subscribe" />
                    <label for="subscribe"> Nhận tin khuyến mãi từ Juno qua email</label>
                </div>
                <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary" onClick="">Đăng Ký</button>
                </div>


            </form>

            <p className="item-signup-data">Bằng việc đăng nhập, bạn đã đồng ý với Điều khoản dịch vụ & chính sách bảo mật của Juno</p>
        </div>
    );
};

export default Register;
