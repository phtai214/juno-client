import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setCartItems, removeItem, updateCartCount } from '../../redux/slices/cartSlice';
import "../../style/pages/customer/Checkout.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const userId = useSelector(state => state.user.id);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cartId, setCartId] = useState("")
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [loading, setLoading] = useState(true);
    const localTotalAfterPromotion = JSON.parse(localStorage.getItem('totalAfterPromotion')) || [];
    const localTotalAfterDiscount = JSON.parse(localStorage.getItem('totalAfterDiscount')) || [];
    const localShippingFee = JSON.parse(localStorage.getItem('shippingFee')) || [];
    const discountAmount = 55000;
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                if (userId) {
                    const cartResponse = await axios.get(`http://localhost:3001/api/v1/cart/user/${userId}`);
                    const cartId = cartResponse.data.id;
                    setCartId(cartId)

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

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1');
                setProvinces(response.data.data.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const response = await axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${selectedProvince}&limit=-1`);
                    setDistricts(response.data.data.data);
                    setWards([]);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            }
        };

        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                try {
                    const response = await axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${selectedDistrict}&limit=-1`);
                    setWards(response.data.data.data);
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            }
        };

        fetchWards();
    }, [selectedDistrict]);


    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        const address = e.target.address.value;
        const province = provinces.find(p => p.code === selectedProvince)?.name || '';
        const district = districts.find(d => d.code === selectedDistrict)?.name || '';
        const ward = wards.find(w => w.name === e.target.ward.value)?.name || '';
        const paymentMethod = e.target.paymentOption.value;
        const phoneNumber = e.target.number.value;
        const fullAddress = `${address}, ${ward}, ${district}, ${province}`;
        const totalAmount = localTotalAfterDiscount;

        // Kiểm tra nếu phương thức thanh toán là MoMo
        if (paymentMethod === "momo") {
            try {
                const paymentResponse = await axios.post('http://localhost:3001/api/v1/transaction/payment/initiate', {
                    amount: totalAmount,
                    orderInfo: "Đặt hàng từ giỏ hàng",
                    redirectUrl: "https://your-redirect-url.com", // Thay thế bằng URL bạn muốn sau khi thanh toán thành công
                    ipnUrl: "https://your-ipn-url.com" // Thay thế bằng URL nhận thông báo từ Momo
                });

                if (paymentResponse.data.payUrl) {
                    // Chuyển hướng người dùng đến trang thanh toán Momo
                    window.location.href = paymentResponse.data.payUrl;
                } else {
                    console.error("Không nhận được URL thanh toán từ MoMo.");
                }
            } catch (error) {
                console.error('Error initiating payment:', error);
            }
            return; // Kết thúc hàm nếu đã xử lý thanh toán MoMo
        }

        // Nếu không phải là MoMo, xử lý cho phương thức COD
        const orderData = {
            user_id: userId,
            total_amount: totalAmount,
            phone_number: phoneNumber,
            shipping_address: fullAddress,
            payment_method: paymentMethod,
            cartItems: cartItems,
        };

        try {
            const response = await axios.post('http://localhost:3001/api/v1/order', orderData);
            const newOrder = response.data;

            const orderItems = cartItems.map(item => ({
                order_id: newOrder.id,
                variation_id: item.variation.id,
                quantity: item.quantity,
                price: item.variation.product.price,
            }));

            if (orderItems.length > 0) {
                for (const orderItem of orderItems) {
                    await axios.post('http://localhost:3001/api/v1/orderItem', orderItem);
                }
            }

            alert("Đơn hàng đã được tạo thành công!");
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="checkout-page-container">
            <div className="row checkout-page-box">
                <div className="col-md-7 checkout-page-item">
                    <div>
                        <img className="" src="" alt="" />
                    </div>
                    <p><Link to="cart">Giỏ hàng </Link> {'>'} Thông tin giao hàng  </p>
                    <form className="form-box" onSubmit={handleOrderSubmit}>
                        <h3 className="">Thông tin giao hàng</h3>
                        <input
                            type="text"
                            name="name"
                            className="nameInput"
                            placeholder="Họ và tên"
                            autoComplete="off"
                            required
                        />
                        <div className="box-input">
                            <input
                                type="text"
                                name="email"
                                className="emailInput"
                                placeholder="Email"
                                autoComplete="off"
                                required
                            />
                            <input
                                type="text"
                                name="number"
                                className="phoneInput"
                                placeholder="Số điện thoại"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="address"
                            className="nameInput"
                            placeholder="Địa chỉ"
                            autoComplete="off"
                            required
                        />
                        <div className="address-box">
                            <select
                                name="province"
                                id="province"
                                className="addressInput"
                                onChange={(e) => setSelectedProvince(e.target.value)}
                                required
                            >
                                <option value="">-- Chọn tỉnh/thành phố --</option>
                                {provinces.map((province) => (
                                    <option key={province.code} value={province.code}>{province.name}</option>
                                ))}
                            </select>
                            <select
                                name="district"
                                id="district"
                                className="addressInput"
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                required
                            >
                                <option value="">-- Chọn quận/huyện --</option>
                                {districts.map((district) => (
                                    <option key={district.code} value={district.code}>{district.name}</option>
                                ))}
                            </select>
                            <select
                                name="ward"
                                id="ward"
                                className="addressInput"
                                required
                            >
                                <option value="">-- Chọn phường/xã --</option>
                                {wards.map((ward) => (
                                    <option key={ward.code} value={ward.name}>{ward.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="shipping-method">
                            <h3>Phương thức vận chuyển</h3>
                            <label className="label-input">
                                <input type="radio" name="shippingOption" value="standard" className="input-radio" />
                                Giao hàng tiêu chuẩn
                            </label>
                        </div>
                        <div className="payment-method">
                            <h3>Phương thức thanh toán</h3>
                            <label className="label-input">
                                <input type="radio" name="paymentOption" value="cod" className="input-radio" />
                                Thanh toán khi nhận hàng
                            </label>
                            <label className="label-input">
                                <input type="radio" name="paymentOption" value="momo" className="input-radio" />
                                Thanh toán qua Momo
                            </label>
                        </div>
                        <div className="form-end">
                            <Link to="cart">Giỏ hàng</Link>
                            <button type="submit">Hoàn tất đơn hàng</button>
                        </div>

                    </form>
                </div>

                <div className="col-md-5 checkout-page-item">
                    {loading ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : cartItems.length === 0 ? (
                        <p>Hiện chưa có sản phẩm trong giỏ hàng.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id}>
                                <div className="cart-pay-container">
                                    <img
                                        src={item.variation.imageUrl} // Update here to use imageUrl
                                        alt={item.variation.product.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-pay">
                                        <p>{item.variation.product.name} - {item.quantity} x {Number(item.variation.product.price).toLocaleString()} VND</p>
                                        {item.variation.color && ( // Assuming color is also in variation
                                            <div style={{ marginTop: '5px', fontSize: '14px', color: '#555' }}>
                                                Màu: <span style={{ fontWeight: 'bold', color: item.variation.color }}>{item.variation.color}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="voucher-container">
                                    <p className="voucher-label">Voucher:</p>
                                    <p className="voucher-amount">{discountAmount.toLocaleString()} VND</p>
                                </div>
                                <div className="summary-container">
                                    <div className="subtotal">
                                        <p className="subtotal-label">Tạm tính:</p>
                                        <p className="subtotal-amount">{localTotalAfterPromotion.toLocaleString()} VND</p>
                                    </div>
                                    <div className="shipping-fee">
                                        <p className="shipping-fee-label">Phí vận chuyển:</p>
                                        <p className="shipping-fee-amount">Miễn phí</p>
                                    </div>
                                </div>
                                <div className="total-container">
                                    <p className="total-label">Tổng cộng:</p>
                                    <p className="total-amount">{localTotalAfterDiscount.toLocaleString()} VND</p>
                                </div>
                            </div>

                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
