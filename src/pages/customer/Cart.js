import React from 'react';

const Cart = () => {
    // Giả định bạn có một mảng sản phẩm trong giỏ hàng
    const cartItems = [
        { id: 1, name: 'Sản phẩm 1', price: 100000, quantity: 2 },
        { id: 2, name: 'Sản phẩm 2', price: 150000, quantity: 1 },
        { id: 3, name: 'Sản phẩm 3', price: 200000, quantity: 3 },
    ];

    // Tính tổng số tiền
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h1>Giỏ hàng</h1>
            {cartItems.length === 0 ? (
                <p>Giỏ hàng của bạn hiện đang trống.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.name} - {item.price.toLocaleString()} VND x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <h3>Tổng tiền: {totalAmount.toLocaleString()} VND</h3>
                </>
            )}
            {/* Thêm thông tin chi tiết về giỏ hàng, phương thức thanh toán, địa chỉ giao hàng, v.v. */}
        </div>
    );
};

export default Cart;
