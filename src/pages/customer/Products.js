import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice'; // Import fetchProducts
import "../../style/pages/customer/Product.scss";
import fakeData from "../../fakeAPI";
import { Link } from 'react-router-dom';
import axios from "axios"
const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products);
    const [combo749k, setCombo749k] = useState(true);
    const [combo899k, setCombo899k] = useState(false);
    const [combo949k, setCombo949k] = useState(false);
    const [combo1149k, setCombo1149k] = useState(false);
    const [combo249k, setCombo249k] = useState(false);
    useEffect(() => {
        dispatch(fetchProducts()); // Gọi action để lấy danh sách sản phẩm
    }, [dispatch]);

    return (
        <div className="product-container">
            <img className="banner-sale-thuong-thuong" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729468478/sale-banner-juno_lbsj4s.png" />
            <div className="box-data-product">
                <div className="newStyle link-small">
                    <div className="box-btn-product">
                        <button className="box-btn-product-setprice active" onClick="">SET 749K</button>
                        <button className="box-btn-product-setprice" onClick="">SET 899K</button>
                        <button className="box-btn-product-setprice" onClick="">SET 949K</button>
                        <button className="box-btn-product-setprice" onClick="">SET 1149K</button>
                        <button className="box-btn-product-setprice" onClick="">Đồng Giá từ 249K</button>
                    </div>
                    {combo749k && (
                        <>
                            <div className="box-btn-product-box2">
                                <button className="box-btn-product-item active" onClick="">Giày</button>
                                <button className="box-btn-product-item" onClick="">Ví</button>
                                <button className="box-btn-product-item" onClick="">Mắt kính</button>
                            </div>
                            <p className="content-combo"><i><span className="content-combo-highlight">SET 749K:</span> 01 Giày + Ví/Mắt kính hoặc được mua cùng 02 sản phẩm trong các nhóm Giày, Ví, Mắt kính</i></p>
                        </>
                    )}
                    {combo899k && (
                        <div className="box-btn-product-box2">
                            <button className="box-btn-product-item" onClick="">Túi nhỏ</button>
                            <button className="box-btn-product-item" onClick="">Sneakers 3cm</button>
                            <button className="box-btn-product-item" onClick="">Giày</button>
                            <button className="box-btn-product-item" onClick="">Ví</button>
                            <button className="box-btn-product-item" onClick="">Mắt kính</button>
                        </div>
                    )}
                    {combo949k && (
                        <div className="box-btn-product-box2">
                            <button className="box-btn-product-item" onClick="">Túi lớn</button>
                            <button className="box-btn-product-item" onClick="">Sneakers 5-7cm</button>
                            <button className="box-btn-product-item" onClick="">Giày</button>
                            <button className="box-btn-product-item" onClick="">Ví</button>
                            <button className="box-btn-product-item" onClick="">Mắt kính</button>
                        </div>
                    )}
                    {combo1149k && (
                        <div className="box-btn-product-box2">
                            <button className="box-btn-product-item" onClick="">Túi nhỏ</button>
                            <button className="box-btn-product-item" onClick="">Sneakers</button>
                            <button className="box-btn-product-item" onClick="">Balo</button>
                            <button className="box-btn-product-item" onClick="">Túi trung </button>
                            <button className="box-btn-product-item" onClick="">Túi lớn</button>
                        </div>
                    )}
                    {combo249k && (
                        <div className="box-btn-product-box2">
                            <button className="box-btn-product-item" onClick="">Tất cả giày sale</button>
                            <button className="box-btn-product-item" onClick="">Giày Sale từ 249K</button>
                            <button className="box-btn-product-item" onClick="">Giày Sale từ 349K</button>
                            <button className="box-btn-product-item" onClick="">Tất cả Túi Sale</button>
                            <button className="box-btn-product-item" onClick="">Túi Sale từ 349K</button>
                            <button className="box-btn-product-item" onClick="">Túi Sale từ 549K</button>
                        </div>
                    )}
                </div>
                {combo749k && (
                    <div className="combo749-container">
                        <div className="combo749 row">
                            {fakeData
                                .filter(product => product.category.includes("Giày")) // Lọc sản phẩm có category chứa từ "Giày"
                                .map((product, index) => (
                                    <div key={index} className="combo749-box col-md-3 col-sm-3">
                                        <Link to="/customer/product/:id"><img className="combo749-box-img" src={product.variations[0].imageUrl} alt={product.name} /></Link>
                                        <div className="btn-product-color">
                                            {/* Tạo nút màu cho từng biến thể của sản phẩm */}
                                            {product.variations.map((variation, i) => (
                                                <button key={i} className={`btn-color${i + 1}`}></button>
                                            ))}
                                        </div>
                                        <p className="name-product">{product.name}</p>
                                        <p className="price-product">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Products;
