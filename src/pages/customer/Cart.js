import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { setCartItems, updateQuantity, removeItem, setTotalAfterPromotion, setTotalAfterDiscount } from '../../redux/slices/cartSlice';
import "../../style/components/common/Cart.scss";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const userId = useSelector(state => state.user.id);
    const [shippingFee, setShippingFee] = useState(25000); // Phí ship cố định
    const [voucher, setVoucher] = useState('');
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [voucherBox, setVoucherBox] = useState(false);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const discountAmount = 55000;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                if (userId) {
                    const cartResponse = await axios.get(`http://localhost:3001/api/v1/cart/user/${userId}`);
                    const cartId = cartResponse.data.id;

                    const itemsResponse = await axios.get(`http://localhost:3001/api/v1/cartItem/cartItems/cart/${cartId}`);
                    const items = itemsResponse.data || [];
                    dispatch(setCartItems(items));
                } else {
                    const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                    dispatch(setCartItems(localCartItems));
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [dispatch, userId]);

    const totalAmount = Array.isArray(cartItems) ? cartItems.reduce((acc, item) => {
        const price = parseFloat(item.variation.product.price) || 0;
        return acc + price * (item.quantity || 0);
    }, 0) : 0;

    const totalAfterPromotion = totalAmount - discountAmount;
    const totalAfterDiscount = totalAfterPromotion - shippingFee;
    localStorage.setItem('totalAfterPromotion', totalAfterPromotion);
    localStorage.setItem('totalAfterDiscount', totalAfterDiscount);
    localStorage.setItem('shippingFee', shippingFee);
    useEffect(() => {
        dispatch(setTotalAfterPromotion(totalAfterPromotion));
        dispatch(setTotalAfterDiscount(totalAfterDiscount));
    }, [dispatch, totalAfterPromotion, totalAfterDiscount]);
    const handleQuantityChange = async (id, event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            try {
                dispatch(updateQuantity({ id, quantity: newQuantity }));
                await axios.put(`http://localhost:3001/api/v1/cartItem/cartItems/${id}`, { quantity: newQuantity });
            } catch (error) {
                console.error('Error updating cart item quantity:', error);
            }
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/v1/cartItem/cartItems/${id}`);
            dispatch(removeItem(id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleVoucherApply = () => {
        if (voucher === 'DISCOUNT10') {
            setVoucherDiscount(totalAmount * 0.1);
        } else {
            alert("Voucher không hợp lệ");
        }
    };

    const handleOrderClick = () => {
        navigate('/customer/checkout');
    };

    return (
        <div className="cart-page-container">
            <h4 className="cart-page-title">Giỏ hàng của bạn ({cartItems.length} sản phẩm trong giỏ hàng)</h4>
            <div className="row cart-page-box">
                <div className="col-md-7 cart-page-box-item">
                    {loading ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : cartItems.length === 0 ? (
                        <p>Hiện chưa có sản phẩm</p>
                    ) : (
                        <ul className="cart-page-box-item-data">
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item-data row">
                                    <div className="cart-box-data-item col-md-3">
                                        <img
                                            src={item.variation.imageUrl.replace(/"/g, '')}
                                            alt={item.variation.product.name}
                                            className="cart-item-image-box"
                                        />
                                    </div>
                                    <div className="cart-box-data-item col-md-8">
                                        <p className="cart-box-data-item-name">{item.variation.product.name}</p>
                                        <div className="cart-box-data-item-price">
                                            {parseFloat(item.variation.product.price).toLocaleString()} VND x
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="0"
                                                onChange={(event) => handleQuantityChange(item.id, event)}
                                                className="cart-box-data-item-quantity"
                                            />
                                            = {(parseFloat(item.variation.product.price) * item.quantity).toLocaleString()} VND

                                            <button className="cart-item-btn-remove" onClick={() => handleRemoveItem(item.id)}>Xóa</button>

                                        </div>
                                        {item.variation.color && ( // Assuming color is also in variation
                                            <div style={{ marginTop: '5px', fontSize: '14px', color: '#555' }}>
                                                Màu: <span style={{ fontWeight: 'bold', color: item.variation.color }}>{item.variation.color}</span>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p className="cart-page-box-note">
                        <i className="note-highlight">
                            - Do lượng đơn hàng tăng cao và ảnh hưởng của bão ở một số khu vực nên việc vận chuyển có thể chậm hơn dự kiến. Mong quý khách hàng thông cảm
                            (*) Click Lấy Voucher giảm thêm để nhận ưu đãi.
                        </i>
                    </p>
                    <p className="cart-item-box">
                        <span className="cart-item-tt">Tổng tiền tạm tính:</span>
                        <span className="cart-item-price">{totalAfterPromotion.toLocaleString()} VND</span>
                    </p>
                </div>

                <div className="col-md-5 cart-page-box-item">
                    {!isLoggedIn && (
                        <p><Link to="/login">Đăng nhập</Link> để tích điểm và hưởng ưu đãi hạng thành viên từ JUNO.</p>
                    )}
                    <div className="order-summary-box-all">
                        <h5 className="order-summary-title">TÓM TẮT ĐƠN HÀNG</h5>
                        <div className="order-summary-box-top">
                            <div className="order-summary">
                                <p className="total-amount">Tổng tiền hàng:</p>
                                <p className="total-amount">Chương trình khuyến mãi:</p>
                            </div>
                            <div className="order-summary-end">
                                <p className="total-amount">{totalAmount.toLocaleString()} VND</p>
                                <p className="total-amount">-55,000₫</p>
                            </div>
                        </div>
                        <div className="order-summary-box">
                            <div className="order-summary">
                                <p className="total-amount">Tạm tính:</p>
                                <p className="total-amount">Phí vận chuyển:</p>
                                <p className="total-amount">Giảm giá vận chuyển:</p>
                            </div>
                            <div className="order-summary-end">
                                <p className="total-amount">{totalAfterPromotion.toLocaleString()} VND</p>
                                <p className="total-amount">{shippingFee.toLocaleString()} VND</p>
                                <p className="total-amount">-{shippingFee.toLocaleString()} VND</p>
                            </div>
                        </div>
                    </div>
                    <div className="voucher-container">
                        <h6 className="voucher-title">Voucher giảm thêm</h6>
                        <div className="voucher-box">
                            <p className="voucher-item">
                                Chọn voucher hoặc nhập mã
                                <img className="voucher-image" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1730613212/down-arrow_11043730_czu97m.png" alt="Down Arrow" />
                            </p>
                        </div>
                        {voucherBox && (
                            <div>
                                <input
                                    type="text"
                                    value={voucher}
                                    onChange={(e) => setVoucher(e.target.value)}
                                    placeholder="Nhập mã voucher"
                                />
                                <button onClick={handleVoucherApply}>Áp dụng</button>
                                {voucherDiscount > 0 && (
                                    <p>Giảm giá từ voucher: {voucherDiscount.toLocaleString()} VND</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="order-summary-box-all">
                        <div className="order-summary-box">
                            <div className="order-summary">
                                <p className="total-amount-end">Tổng tiền :</p>
                            </div>
                            <div className="order-summary-end">
                                <p className="total-amount-end">{totalAfterDiscount.toLocaleString()} VND</p>
                                <p className="total-amount-end-highlight">tiết kiệm {shippingFee.toLocaleString()} VND</p>
                            </div>
                        </div>
                        <button className="btn-order-now" onClick={handleOrderClick}>Tiến Hàng Đặt Hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
