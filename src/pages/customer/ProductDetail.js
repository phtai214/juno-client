import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../../style/pages/customer/ProductDetail.scss";
import axios from 'axios';
import { addItem, updateCartCount } from '../../redux/slices/cartSlice';
const ProductDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [detail, setDetail] = useState(true);
    const [describe, setDescribe] = useState(false);
    const [preserve, setPreserve] = useState(false);
    const [policy, setPolicy] = useState(true);
    const [selectedColor, setSelectedColor] = useState(null);
    const [cartCount, setCartCount] = useState(() => {
        const savedCartCount = localStorage.getItem('cartCount');
        return savedCartCount ? JSON.parse(savedCartCount) : 0; // Lấy từ localStorage
    });
    const user_id = useSelector((state) => state.user.id) || localStorage.getItem('userId') || '';

    const [reviews, setReviews] = useState([]); // State for reviews
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hasPurchased, setHasPurchased] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/product/slug/${slug}`);
                const productWithCleanedImage = {
                    ...response.data,
                    image_url: response.data.image_url.replace(/"/g, ''),
                };

                setProduct(productWithCleanedImage);
                await fetchReviews(response.data.id);
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
        setSelectedColor(color);
    };

    const handleAddToCart = async (product) => {
        const userId = localStorage.getItem('userId');
        const productId = product.id;

        // Kiểm tra xem đã chọn màu chưa
        if (!selectedColor) {
            alert('Vui lòng chọn màu trước khi thêm vào giỏ hàng.');
            return;
        }

        // Tìm variation_id dựa trên màu đã chọn
        const selectedVariation = product.Variations.find(variation => variation.color === selectedColor);
        const variationId = selectedVariation ? selectedVariation.id : null;

        if (userId) {
            try {
                const cartResponse = await axios.get('http://localhost:3001/api/v1/cart/carts');
                let cartId;

                if (cartResponse.data.length > 0 && cartResponse.data[0].user_id === Number(userId)) {
                    cartId = cartResponse.data[0].id;
                } else {
                    const createCartResponse = await axios.post('http://localhost:3001/api/v1/cart/carts', { user_id: userId });
                    cartId = createCartResponse.data.cart.id;
                }

                await axios.post(`http://localhost:3001/api/v1/cartItem/cartItems`, {
                    product_id: productId,
                    quantity: 1,
                    cart_id: cartId,
                    color: selectedColor,
                    variation_id: variationId // Thêm variation_id vào đây
                });

                setCartCount(prevCount => prevCount + 1);
                localStorage.setItem('cart', JSON.stringify(true));
                dispatch(updateCartCount(cartCount + 1));
                alert('Sản phẩm đã được thêm vào giỏ hàng!');
            } catch (error) {
                console.error('Error adding product to cart:', error);
                alert('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.');
            }
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(item => item.id === product.id && item.color === selectedColor);

            if (existingItem) {
                existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
            } else {
                const cartItem = { ...product, quantity: 1, color: selectedColor, variation_id: variationId }; // Thêm variation_id
                cartItems.push(cartItem);
            }

            dispatch(updateCartCount(cartCount + 1));
            dispatch(addItem(cartItems)); // Cập nhật vào Redux
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            setCartCount(prevCount => prevCount + 1);
            localStorage.setItem('cart', JSON.stringify(true));
            alert('Sản phẩm đã được thêm vào giỏ hàng tạm thời!');
        }
    };

    const handleAddReview = async () => {
        if (!reviewText) {
            alert('Vui lòng điền tên và nội dung đánh giá.');
            return;
        }

        const newReview = {
            user_id: user_id,
            product_id: product.id,
            rating: rating,
            comment: reviewText,
        };

        try {
            // Call API to save the review
            await axios.post(`http://localhost:3001/api/v1/review`, newReview);
            setReviews([...reviews, newReview]); // Update local state
            setReviewText('');
            setRating(0);
            alert('Đánh giá của bạn đã được gửi!');
        } catch (error) {
            console.error('Error adding review:', error);
            alert('Đã xảy ra lỗi khi gửi đánh giá.');
        }
    };


    const formatPrice = (price) => {
        const amount = parseFloat(price);
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'VND' }).replace('₫', '').trim() + ' VND';
    };

    const fetchReviews = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/review/product/${productId}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        const fetchPurchasedProducts = async () => {
            try {
                const ordersResponse = await axios.get(`http://localhost:3001/api/v1/order/users/${user_id}`);
                const orders = ordersResponse.data;

                // Lưu trữ tất cả product_id đã mua
                const purchasedProducts = [];

                // Lặp qua mỗi đơn hàng và gọi API để lấy order items
                for (const order of orders) {
                    const orderItemsResponse = await axios.get(`http://localhost:3001/api/v1/orderItem/order/${order.id}`);
                    const orderItems = orderItemsResponse.data;
                    // Thêm product_id từ order items vào danh sách đã mua
                    orderItems.forEach(item => {
                        purchasedProducts.push(item.variation.productId);
                    });
                }

                // Kiểm tra xem sản phẩm hiện tại có trong danh sách đã mua không
                if (product && purchasedProducts.includes(product.id)) {
                    setHasPurchased(true);
                }
            } catch (error) {
                console.error('Error fetching purchased products:', error);
            }
        };

        if (user_id && product) { // Kiểm tra user_id và product không null
            fetchPurchasedProducts();
        }
    }, [user_id, product]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail-page">
            <div className="product-detail row">
                <div className="col-md-7 box-product-detail">
                    <div className="row image-product-detail">
                        {product.Variations.map((variation) => (
                            <div className="image-product-detail-box col-md-6" key={variation.id}>
                                <img
                                    className="product-detail-box-item-img"
                                    src={variation.imageUrl || product.image_url}
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
                                onClick={() => handleColorClick(variation.color)}
                            >
                            </button>
                        ))}
                    </div>
                    <div className="btn-product-order">
                        <button className="order-now" onClick={() => handleAddToCart(product)}>Mua ngay</button>
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
            <div className="reviews-section">
                <h6>Đánh giá sản phẩm</h6>
                {hasPurchased ? (
                    <div className="review-form">
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <img
                                    key={star}
                                    src={
                                        star <= rating
                                            ? "https://res.cloudinary.com/dhjrrk4pg/image/upload/v1730822143/star_12259255_safjun.png"
                                            : "https://res.cloudinary.com/dhjrrk4pg/image/upload/v1730817533/favourite_339922_v2i0fi.png"
                                    }
                                    alt={`Star ${star}`}
                                    className="star"
                                    onClick={() => {
                                        setRating(star);
                                        console.log('Rating:', star);
                                    }}
                                />
                            ))}
                        </div>
                        <textarea
                            placeholder="Nội dung đánh giá"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <button onClick={handleAddReview}>Gửi đánh giá</button>
                    </div>
                ) : (
                    <p>Bạn cần mua sản phẩm này trước khi có thể đánh giá.</p>
                )}
                <div className="review-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <img className="user-avatar" src={review.user.avatar || 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1715060332/user_1177568_mxilzq.png'} />
                            <h6>
                                {review.user ? review.user.name : 'Không có tên'}
                                <span>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <img
                                            key={i}
                                            src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1730822143/star_12259255_safjun.png"
                                            alt={`Star ${i + 1}`}
                                            className="star"
                                        />
                                    ))}
                                    {[...Array(5 - review.rating)].map((_, i) => (
                                        <img
                                            key={i + review.rating}
                                            src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1730817533/favourite_339922_v2i0fi.png"
                                            alt={`Empty star ${i + 1}`}
                                            className="star"
                                        />
                                    ))}
                                </span>
                            </h6>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
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
