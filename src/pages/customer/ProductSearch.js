// src/pages/ProductSearch.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../../style/pages/customer/ProductSearch.scss";

const ProductSearch = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        const fetchProducts = async () => {
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

        fetchProducts();
    }, []);

    useEffect(() => {
        if (query) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [query, products]);

    return (
        <div className="product-container">
            <h2>Kết quả tìm kiếm cho: "{query}"</h2>
            <div className="combo749-container">
                <div className="combo749 row">
                    {filteredProducts.length === 0 ? (
                        <p>Không có sản phẩm nào khớp với tìm kiếm của bạn.</p>
                    ) : (
                        filteredProducts.map((product, index) => (
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

export default ProductSearch;
