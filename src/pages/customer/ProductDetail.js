import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../style/pages/customer/ProductDetail.scss";

const ProductDetail = () => {
    const { slug } = useParams();
    const [detail, setDetail] = useState(true);
    const [describe, setDescribe] = useState(false);
    const [preserve, setPreserve] = useState(false);
    const [policy, setPolicy] = useState(true);

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
    return (
        <div className="product-detail-page">
            <div className="product-detail row">
                <div className="col-md-7 box-product-detail">
                    <div className="row image-product-detail">
                        <div className="image-product-detail-box col-md-6">
                            <img className="product-detail-box-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729506651/kem_sd03070_3_20240827175705_ca8a3dc8af8b41099e180aa3763ec3e8_master_byohug.jpg" />
                        </div>
                        <div className="image-product-detail-box col-md-6">
                            <img className="product-detail-box-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729507361/juno-project/kem_sd03070_3_20240820164939_2621438d2bac4e75854cf175bb6e1451_master_an2aol.jpg" />
                        </div>
                    </div>
                    <div className="row image-product-detail">
                        <div className="image-product-detail-box col-md-6">
                            <img className="product-detail-box-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729507361/juno-project/kem_sd03070_2_20240820164939_e1b26c5419d7426a8dc2825cfd87e91a_master_eot3gd.jpg" />
                        </div>
                        <div className="image-product-detail-box col-md-6">
                            <img className="product-detail-box-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729504578/kem_sd03070_2_20240827175705_144e6d1581a84d82830273ee6727e483_master_bhllpc.jpg" />
                        </div>
                    </div>
                    <div className="row image-product-detail">
                        <div className="image-product-detail-box col-md-3">
                            <img className="product-detail-box-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729506737/kem_sd03070_4_20240820164939_0b4a16ab79334aa4bd595756b1c31f6c_master_ma5tix.jpg" />
                        </div>
                        <div className="image-product-detail-box col-md-3">
                            <img className="product-detail-box-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729504578/kem_sd03070_2_20240827175705_144e6d1581a84d82830273ee6727e483_master_bhllpc.jpg" />
                        </div>
                        <div className="image-product-detail-box col-md-3">
                            <img className="product-detail-box-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729506737/kem_sd03070_3_20240820164939_2621438d2bac4e75854cf175bb6e1451_master_k8iabz.jpg" />
                        </div>
                        <div className="image-product-detail-box col-md-3">
                            <img className="product-detail-box-item-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729504578/kem_sd03070_1_20240820164939_0fe950ba632543cc82ffa04c4b7d2046_master_mgujmt.jpg" />
                        </div>
                    </div>
                </div>
                <div className="col-md-5 box-product-detail-data">
                    <h6 className="product-title-name">Giày Sandal Gót Trụ Quai Ngang Phối Quai Xéo</h6>
                    <p className="product-price">349,000₫</p>
                    <div className="btn-product-color">
                        <button className='btn-color1'></button>
                        <button className='btn-color2'></button>
                        <button className='btn-color3'></button>
                    </div>
                    <div className="btn-product-size">
                        <button className='btn-size'>35</button>
                        <button className='btn-size'>36</button>
                        <button className='btn-size'>37</button>
                        <button className='btn-size'>38</button>
                        <button className='btn-size'>39</button>
                    </div>
                    <a href="/">Hướng dẫn tính size</a>
                    <div className="btn-product-order">
                        <button className="order-now">Mua ngay</button>
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
                                    <li>Mã sản phẩm: SD07099</li>
                                    <li>Kiểu dáng: Giày xăng đan</li>
                                    <li>Chất liệu: Si mờ trơn</li>
                                    <li>Độ cao: 7cm</li>
                                    <li>Màu sắc: Kem-Trắng-Đen</li>
                                    <li>Kích cỡ: 35-36-37-38-39</li>
                                    <li>Xuất xứ: Việt Nam</li>
                                    <li>Giá đã bao gồm VAT</li>
                                </ul>
                            </div>
                        )}
                        {describe && (
                            <div className="detail-box-data">
                                <p>Giày Sandal Gót Trụ Quai Ngang Phối Quai Xéo thanh lịch</p>
                                <p>Giày đế cao 7cm tạo sự tự tin khi sử dụng</p>
                                <p>Phần quai xéo thiết kế phá cách tạo điểm nhấn khác biệt</p>
                                <p>Gót được thiết kế bọc kim loại mới lạ</p>
                                <p>Chất liệu cao cấp bền đẹp, dễ bảo quản và sử dụng</p>
                                <p>Có 3 màu sắc cơ bản Trắng, Đen, Kem cho nàng có đa dạng sự lựa chọn và phù hợp với nhiều phong cách</p>
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
