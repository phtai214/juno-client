// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"

const ProductList = () => {
    const { category } = useParams(); // Lấy category từ URL
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Giả sử bạn có một API để lấy sản phẩm theo danh mục
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products?category=${category}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <div className="product-list">
            <h2>Sản phẩm trong danh mục: {category}</h2>
            <div className="products">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Giá: {product.price} VNĐ</p>
                        <img src={product.image} alt={product.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;