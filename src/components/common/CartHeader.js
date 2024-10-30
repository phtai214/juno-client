import React, { useState } from 'react';
import "../../style/components/common/CartHeader.scss";

const CartHeader = ({ setCart, isOpen }) => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Sản phẩm 1', price: 100000, quantity: 2 },
        { id: 2, name: 'Sản phẩm 2', price: 150000, quantity: 1 },
        { id: 3, name: 'Sản phẩm 3', price: 200000, quantity: 3 },
    ]);

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCloseCart = () => {
        setCart(false);
    };

    const handleQuantityChange = (id, event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <div className="cart-overlay">
            <div className={`cart-page ${isOpen ? 'open' : ''}`}>
                <div className="cart-overlay-box">
                    <div className="cart-overlay-box-item">
                        <p className="cart-overlay-title">Giỏ hàng</p>
                        <p className="cart-overlay-note">Bạn đang có {cartItems.length} sản phẩm trong giỏ hàng</p>
                    </div>
                    <button onClick={handleCloseCart} className="close-cart">
                        <img className="img-close-cart" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1728520649/cross-small_3917203_rplegl.png" alt="Close" />
                    </button>
                </div>
                {cartItems.length === 0 ? (
                    <p>Hiện chưa có sản phẩm</p>
                ) : (
                    <>
                        <ul className="cart-box-data">
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item-data">
                                    <img src={item.image} alt={item.name} className="cart-item-image" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                    {item.name} - {item.price.toLocaleString()} VND x
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="0"
                                        onChange={(event) => handleQuantityChange(item.id, event)}
                                        style={{ width: '50px', marginLeft: '5px' }}
                                    />
                                    = {(item.price * item.quantity).toLocaleString()} VND
                                    <button className="cart-item-btn-remove" onClick={() => removeItem(item.id)} style={{ marginLeft: '10px' }}>
                                        Xóa
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <p className="cart-item-box"><span className="cart-item-tt">Tổng tiền tạm tính:</span> <span className="cart-item-price">{totalAmount.toLocaleString()} VND</span></p>
                    </>
                )}
                <button className="view-cart-detail">Xem Giỏ Hàng</button>
            </div>
        </div>
    );
};

export default CartHeader;