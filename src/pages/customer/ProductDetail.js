import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../../style/pages/customer/ProductDetail.scss";
import axios from 'axios'; // Đảm bảo có axios để thực hiện gọi API
import { addItem } from '../../redux/slices/cartSlice';

const ProductDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [detail, setDetail] = useState(true);
    const [describe, setDescribe] = useState(false);
    const [preserve, setPreserve] = useState(false);
    const [policy, setPolicy] = useState(true);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/product/slug/${slug}`);
                setProduct(response.data);
                console.log('Response data:', response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [slug]);

    const handleDetailClick = () => {
        setDetail(true);
        setDescribe(false);
    };

    const handleDescribeClick = () => {
        setDetail(false);
        setDescribe(true);
    };

    const handlePreserveClick = () => {
        setPreserve(true);
        setPolicy(false);
    };

    const handlePolicyClick = () => {
        setPreserve(false);
        setPolicy(true);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color); // Cập nhật màu đã chọn
    };

    const handleBuyNow = async (product) => {
        const userId = localStorage.getItem('userId'); // Lấy userId từ local storage
        console.log("check productId", product.id);
        const productId = product.id
        if (userId) {
            // Nếu người dùng đã đăng nhập, tiếp tục với logic giỏ hàng
            try {
                const cartResponse = await axios.get('http://localhost:3001/api/v1/cart/carts');
                let cartId;

                // Kiểm tra xem có giỏ hàng nào và có đúng user_id hay không
                if (cartResponse.data.length > 0 && cartResponse.data[0].user_id === Number(userId)) {
                    // Nếu có giỏ hàng và user_id khớp, lấy ID từ giỏ hàng hiện tại
                    cartId = cartResponse.data[0].id;
                } else {
                    // Nếu không có giỏ hàng hoặc user_id không khớp, tạo giỏ hàng mới
                    const createCartResponse = await axios.post('http://localhost:3001/api/v1/cart/carts', { user_id: userId });
                    if (createCartResponse.data && createCartResponse.data.cart) {
                        cartId = createCartResponse.data.cart.id;
                    } else {
                        console.error('Error creating cart:', createCartResponse.data);
                        alert('Đã xảy ra lỗi khi tạo giỏ hàng.');
                        return; // Dừng hàm nếu có lỗi
                    }
                }
                console.log("check data >>> ", productId, cartId)
                // Thêm sản phẩm vào giỏ hàng
                await axios.post(`http://localhost:3001/api/v1/cartItem/cartItems`, {
                    product_id: productId,
                    quantity: 1,
                    cart_id: cartId,
                    color: selectedColor // Gửi màu đã chọn
                });

                alert('Sản phẩm đã được thêm vào giỏ hàng!');
            } catch (error) {
                console.error('Error adding product to cart:', error);
                alert('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.');
            }
        } else {
            // Nếu người dùng chưa đăng nhập, xử lý giỏ hàng tạm thời
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
            } else {
                cartItems.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới
            }

            // Cập nhật vào Redux
            const cartItem = { ...product, quantity: 1, color: selectedColor };
            dispatch(addItem(cartItem));
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert('Sản phẩm đã được thêm vào giỏ hàng tạm thời!');
        }
    };

    const formatPrice = (price) => {
        const amount = parseFloat(price);
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'VND' }).replace('₫', '').trim() + ' VND';
    };
    if (!product) return <div>Loading...</div>; // Hiển thị loading nếu chưa có dữ liệu

    return (
        <div className="product-detail-page">
            <div className="product-detail row">
                <div className="col-md-7 box-product-detail">
                    <div className="row image-product-detail">
                        {product.Variations.map((variation) => (
                            <div className="image-product-detail-box col-md-6" key={variation.id}>
                                <img
                                    className="product-detail-box-item-img"
                                    src={variation.imageUrl || product.image_url} // Sử dụng imageUrl từ variation hoặc hình ảnh chính
                                    alt={product.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-5 box-product-detail-data">
                    <h6 className="product-title-name">{product.name}</h6>
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <div className="btn-product-color">
                        {product.Variations.map((variation) => (
                            <button
                                key={variation.id}
                                className={`btn-color-${variation.color.toLowerCase().replace(/ /g, '-')}`}
                                onClick={() => handleColorClick(variation.color)} // Thêm sự kiện click
                            >
                            </button>
                        ))}
                    </div>
                    <div className="btn-product-order">
                        <button className="order-now" onClick={() => handleBuyNow(product)}>Mua ngay</button>
                        <button className="order-set-trendding">Mua set trendding</button>
                    </div>
                    <button className="btn-showroom">Tìm Sản Phẩm Tại ShowRoom</button>
                    <p><a>Đăng nhập</a> để tích điểm và hưởng quyền lợi thành viên từ JUNO</p>
                    <div className='box-data'>
                        <h6 className="data-freeship">MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</h6>
                        <p className="data-freeship-note">(Cho hoá đơn từ 300.000đ)</p>
                    </div>
                    <div className='box-data'>
                        <h6 className="data-freeship">ĐỔI TRẢ DỄ DÀNG</h6>
                        <p className="data-freeship-note">(Đổi trả 30 ngày cho Giày và Túi; 7 ngày cho Phụ kiện nếu lỗi nhà sản xuất)</p>
                    </div>
                    <div className='box-data'>
                        <h6 className="data-freeship">TỔNG ĐÀI BÁN HÀNG 1800 1162</h6>
                        <p className="data-freeship-note">(Miễn phí từ 8:00 - 21:00 mỗi ngày)</p>
                    </div>
                    <div className="describe-data">
                        <div className="btn-describe-data">
                            <button
                                className={`btn-describe-onclick ${describe ? 'active' : ''}`}
                                onClick={handleDescribeClick}
                            >
                                Mô tả sản phẩm
                            </button>
                            <button
                                className={`btn-describe-onclick ${detail ? 'active' : ''}`}
                                onClick={handleDetailClick}
                            >
                                Chi tiết
                            </button>
                        </div>
                        {detail && (
                            <div className="detail-box-data">
                                <ul>
                                    <li>Mã sản phẩm: {product.id}</li>
                                    <li>Kiểu dáng: {product.category}</li>

                                    {product.Variations.length > 0 && (
                                        <>
                                            <li> Màu sắc: {product.Variations.map(variation => variation.color).join('-')}
                                            </li>
                                            <li>Kích cỡ: {product.material}
                                                {product.Variations[0].size}
                                            </li>
                                        </>
                                    )}
                                    <li>Chất liệu: {product.material || 'Chất liệu chưa rõ'}</li>
                                    <li>Xuất xứ: {product.material}</li>
                                    <li>Giá đã bao gồm VAT</li>
                                    {/* Thêm các thông tin khác nếu cần */}
                                </ul>
                            </div>
                        )}
                        {describe && (
                            <div className="detail-box-data">
                                <p>{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="box-preserve-policy">
                <div className="btn-preserve-policy-data">
                    <button className={`btn-policy-onclick ${policy ? 'active' : ''}`} onClick={handlePolicyClick}>
                        Chính sách đổi trả
                    </button>
                    <button className={`btn-policy-onclick ${preserve ? 'active' : ''}`} onClick={handlePreserveClick}>
                        Hướng dẫn bảo quản
                    </button>
                </div>
                {policy && (
                    <div className="detail-box-data">
                        <p>JUNO hiện đang áp dụng chính sách Đổi/Trả cho các sản phẩm như sau:</p>
                        <ul>
                            <li>Trong vòng 30 ngày kể từ ngày nhận sản phẩm Túi, Ví, Giày (Hàng Nguyên Giá)</li>
                            <li>Trong vòng 7 ngày đối với sản phẩm Khuyến mãi</li>
                            <li>Phụ kiện (chỉ áp dụng với mắt kính, trang sức) và túi canvas được đổi/trả trong 7 ngày trong trường hợp có lỗi sản xuất</li>
                            <li>Không áp dụng đổi trả Online với đơn hàng tại hệ thống Cửa hàng Đại lý và Cửa hàng Juno tại TTTM Sense City Phạm Văn Đồng, các Cửa Hàng Aeon Mall Bình Dương, Aeon Mall Tân Phú, Aeon Mall Bình Tân.</li>
                        </ul>
                        <p><strong>Xem thêm chính sách đổi trả:</strong></p>
                        <p><a href="#">Tại đây: Xem chi tiết</a></p>
                    </div>
                )}
                {preserve && (
                    <div className="detail-box-data">
                        <div class="guideline">
                            <p>HƯỚNG DẪN BẢO QUẢN GIÀY <a href="#"> Xem chi tiết</a></p>
                        </div>
                        <div class="guideline">
                            <p>HƯỚNG DẪN BẢO QUẢN TÚI XÁCH <a href="#"> Xem chi tiết</a></p>
                        </div>
                        <div class="guideline">
                            <p>HƯỚNG DẪN BẢO QUẢN PHỤ KIỆN <a href="#"> Xem chi tiết</a></p>
                        </div>
                    </div>
                )}
            </div>
            <div className="maybe-container">
                <h4 className="maybe-title">Có thể nàng sẽ thích</h4>
                <div className="maybe row">
                    <div className="col-md-3 maybe-box">
                        <img className="maybe-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729506737/kem_sd03070_4_20240820164939_0b4a16ab79334aa4bd595756b1c31f6c_master_ma5tix.jpg" />
                        <h6 className="maybe-item-title-name">Giày Sandal 1</h6>
                        <p className="maybe-item-price">349,000đ</p>
                        <button className="maybe-item-btn">Xem chi tiết</button>
                    </div>
                    <div className="col-md-3 maybe-box">
                        <img className="maybe-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729506737/kem_sd03070_4_20240820164939_0b4a16ab79334aa4bd595756b1c31f6c_master_ma5tix.jpg" />
                        <h6 className="maybe-item-title-name">Giày Sandal 1</h6>
                        <p className="maybe-item-price">349,000đ</p>
                        <button className="maybe-item-btn">Xem chi tiết</button>
                    </div>
                    <div className="col-md-3 maybe-box">
                        <img className="maybe-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729506737/kem_sd03070_4_20240820164939_0b4a16ab79334aa4bd595756b1c31f6c_master_ma5tix.jpg" />
                        <h6 className="maybe-item-title-name">Giày Sandal 1</h6>
                        <p className="maybe-item-price">349,000đ</p>
                        <button className="maybe-item-btn">Xem chi tiết</button>
                    </div>
                    <div className="col-md-3 maybe-box">
                        <img className="maybe-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729506737/kem_sd03070_4_20240820164939_0b4a16ab79334aa4bd595756b1c31f6c_master_ma5tix.jpg" />
                        <h6 className="maybe-item-title-name">Giày Sandal 1</h6>
                        <p className="maybe-item-price">349,000đ</p>
                        <button className="maybe-item-btn">Xem chi tiết</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
