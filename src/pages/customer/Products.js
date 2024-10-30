import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice'; // Import fetchProducts
import "../../style/pages/customer/Product.scss";
import { Link } from 'react-router-dom';
import axios from "axios";

const Products = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.products);
    const [products, setProducts] = useState([]); // State để lưu sản phẩm
    const [combo749k, setCombo749k] = useState(true);
    const [combo899k, setCombo899k] = useState(false);
    const [combo949k, setCombo949k] = useState(false);
    const [combo1149k, setCombo1149k] = useState(false);
    const [combo249k, setCombo249k] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/product/products');
                // Kiểm tra nếu data.products là một mảng hợp lệ
                if (Array.isArray(response.data.products)) {
                    const formattedProducts = response.data.products.map(product => ({
                        ...product,
                        image_url: product.image_url.replace(/"/g, ''), // Loại bỏ dấu ngoặc kép
                    }));
                    setProducts(formattedProducts);
                } else {
                    console.error('Products data is not an array:', response.data.products);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData(); // Gọi hàm lấy dữ liệu
        dispatch(fetchProducts()); // Gọi action để lấy danh sách sản phẩm
    }, [dispatch]);

    return (
        <div className="product-container">
            <img className="banner-sale-thuong-thuong" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1729468478/sale-banner-juno_lbsj4s.png" />
            <div className="box-data-product">
                <div className="newStyle link-small">
                    <div className="box-btn-product">
                        <button className="box-btn-product-setprice active" onClick={() => { setCombo749k(true); setCombo899k(false); setCombo949k(false); setCombo1149k(false); setCombo249k(false); }}>SET 749K</button>
                        <button className="box-btn-product-setprice" onClick={() => { setCombo749k(false); setCombo899k(true); setCombo949k(false); setCombo1149k(false); setCombo249k(false); }}>SET 899K</button>
                        <button className="box-btn-product-setprice" onClick={() => { setCombo749k(false); setCombo899k(false); setCombo949k(true); setCombo1149k(false); setCombo249k(false); }}>SET 949K</button>
                        <button className="box-btn-product-setprice" onClick={() => { setCombo749k(false); setCombo899k(false); setCombo949k(false); setCombo1149k(true); setCombo249k(false); }}>SET 1149K</button>
                        <button className="box-btn-product-setprice" onClick={() => { setCombo749k(false); setCombo899k(false); setCombo949k(false); setCombo1149k(false); setCombo249k(true); }}>Đồng Giá từ 249K</button>
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
                            {products.length === 0 ? (
                                <p>Không có sản phẩm nào.</p> // Thông báo nếu không có sản phẩm
                            ) : (
                                products
                                    .filter(product => product.category.includes("Giày")) // Lọc sản phẩm có category chứa từ "Giày"
                                    .map((product, index) => (
                                        <div key={index} className="combo749-box col-md-3 col-sm-3">
                                            <Link to={`/customer/product/${product.slug}`}>
                                                <img className="combo749-box-img" src={product.image_url} alt={product.name} />
                                            </Link>
                                            <div className="btn-product-color">
                                                {/* Tạo nút màu cho từng biến thể của sản phẩm */}
                                                {product.variations && product.variations.map((variation, i) => (
                                                    <button key={i} className={`btn-color${i + 1}`} style={{ backgroundColor: variation.color }}></button>
                                                ))}
                                            </div>
                                            <p className="name-product">{product.name}</p>
                                            <p className="price-product">{parseInt(product.price).toLocaleString('vi-VN')}đ</p>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;