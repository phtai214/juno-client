import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import "../../style/pages/customer/Product.scss";
import { Link } from 'react-router-dom';
import axios from "axios";


const Products = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/product/products');
                if (Array.isArray(response.data.products)) {
                    const formattedProducts = response.data.products.map(product => ({
                        ...product,
                        image_url: product.image_url.replace(/"/g, ''),
                    }));
                    setProducts(formattedProducts);
                } else {
                    console.error('Products data is not an array:', response.data.products);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
        dispatch(fetchProducts());
    }, [dispatch]);



    return (
        <div className="product-container">

            <div className="combo749-container">
                <div className="combo749 row">
                    {products.length === 0 ? (
                        <p>Không có sản phẩm nào.</p>
                    ) : (
                        products.map((product, index) => (
                            <div key={index} className="combo749-box col-md-3 col-sm-3">
                                <Link to={`/customer/product/slug/${product.slug}`}>
                                    <img className="combo749-box-img" src={product.image_url} alt={product.name} />
                                </Link>
                                <div className="btn-product-color">
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
        </div>
    );
};

export default Products;