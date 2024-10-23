import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "../../style/components/common/SliderProduct.scss";
import fakeData from "../../fakeAPI";
const SliderProduct = () => {
    return (
        <div className="slider-container">
            <div className="product-slider-flash-sale">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                >
                    {fakeData.map((product, index) => (
                        <SwiperSlide key={index}>
                            <div className="product-slider-item">
                                <div className="product-slider-image-box">
                                    <img className="product-slider-image" src={product.variations[0].imageUrl} alt={product.name} />
                                    <span className="product-slider-highlight">FLASH SALE</span>
                                </div>
                                <p className="product-slider-title">{product.name}</p>
                                <p className="product-slider-price">{product.price.toLocaleString()}đ</p>
                                <div className="btn-product-color">
                                    {product.variations.map((variation, idx) => (
                                        <button key={idx} className={`btn-color${idx + 1}`} style={{ backgroundColor: variation.color }}></button>
                                    ))}
                                </div>
                                <button className="btn-pay-flash-sale">Mua giá FLASH SALE</button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link className="product-slider-link" to="">Xem Tất Cả</Link>
            </div>
        </div>
    );
};

export default SliderProduct;