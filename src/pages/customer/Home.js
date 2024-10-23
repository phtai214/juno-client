import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "../../style/pages/customer/Home.scss"
import Countdown from "../../components/common/Countdown";
import SliderProduct from "../../components/common/SliderProduct"
const Home = () => {
    const targetDate = new Date().getTime() + 24 * 60 * 60 * 1000;
    return (
        <div className="home-container">
            <div className="Banner-homePage">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={false}
                    loop={true}
                >
                    <SwiperSlide>
                        <img src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729532112/462750862_971291508374000_4330426561271959884_n_joakto.jpg" alt="Image 1" style={{ width: '100%', height: 'auto' }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729629987/461804403_963256905844127_7265258711963620623_n_ylkyxe.jpg" alt="Image 2" style={{ width: '100%', height: 'auto' }} />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="FLASH-SALE">
                <h1 className="FLASH-SALE-title">FLASH SALE</h1>
                <Countdown targetDate={targetDate} />
                <div className="box-banner-small">
                    <img className="banner-small-image" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729631496/img_7150_aej5mr.jpg" />
                    <img className="banner-small-image" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729631497/img_7152_xogmhl.png" />
                    <img className="banner-small-image" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729631496/img_7151_swphdr.jpg" />
                </div>
                <SliderProduct />
                <div className="product-new">
                    <h4 className="product-new-title">HÀNG MỚI VỀ</h4>
                    <p className="product-new-note">Các sản phẩm bắt nhịp quốc tế, nàng thời thượng không nên bỏ lỡ</p>
                    <div className="product-new-box row">
                        <div className="product-new-item col-md-4">
                            <img className="product-new-item-image" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729678281/kem_txn866_1_20241021200044_ebcee7caf6e044f1be18e6a2b7f61e44_master_hu23dj.png" />

                            <p className="product-new-sp-title">Túi Xách Nhỏ Bear Hug</p>
                            <p className="product-new-sp-price">849,000₫</p>

                            <div className="btn-product-color">
                                <button className='btn-color1' ></button>
                                <button className='btn-color2' ></button>
                                <button className='btn-color2' ></button>
                            </div>
                            <button className="btn-pay-now">Mua Ngay</button>
                        </div>
                        <div className="product-new-item col-md-4">
                            <img className="product-new-item-image" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729678281/kem_txn866_1_20241021200044_ebcee7caf6e044f1be18e6a2b7f61e44_master_hu23dj.png" />

                            <p className="product-new-sp-title">Túi Xách Nhỏ Bear Hug</p>
                            <p className="product-new-sp-price">849,000₫</p>

                            <div className="btn-product-color">
                                <button className='btn-color1' ></button>
                                <button className='btn-color2' ></button>
                                <button className='btn-color2' ></button>
                            </div>
                            <button className="btn-pay-now">Mua Ngay</button>
                        </div>
                        <div className="product-new-item col-md-4">
                            <img className="product-new-item-image" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729678281/kem_txn866_1_20241021200044_ebcee7caf6e044f1be18e6a2b7f61e44_master_hu23dj.png" />

                            <p className="product-new-sp-title">Túi Xách Nhỏ Bear Hug</p>
                            <p className="product-new-sp-price">849,000₫</p>

                            <div className="btn-product-color">
                                <button className='btn-color1' ></button>
                                <button className='btn-color2' ></button>
                                <button className='btn-color2' ></button>
                            </div>
                            <button className="btn-pay-now">Mua Ngay</button>
                        </div>
                        <div className="product-new-item col-md-4">
                            <img className="product-new-item-image" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729678281/kem_txn866_1_20241021200044_ebcee7caf6e044f1be18e6a2b7f61e44_master_hu23dj.png" />

                            <p className="product-new-sp-title">Túi Xách Nhỏ Bear Hug</p>
                            <p className="product-new-sp-price">849,000₫</p>

                            <div className="btn-product-color">
                                <button className='btn-color1' ></button>
                                <button className='btn-color2' ></button>
                                <button className='btn-color2' ></button>
                            </div>
                            <button className="btn-pay-now">Mua Ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;