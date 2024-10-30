import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react";
import "../../style/pages/admin/product.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function Product() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/product/products`);
                const data = response.data; // Lấy dữ liệu từ phản hồi
                console.log("check data", data);

                // Kiểm tra xem data.products có phải là mảng hay không
                if (Array.isArray(data.products)) {
                    setData(data.products); // Lưu trữ danh sách sản phẩm
                } else {
                    console.error('Products data is not an array:', data.products);
                    setData([]); // Đặt lại dữ liệu về mảng rỗng nếu không đúng
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="product-container">
            <div className="title-box">
                <h2 className="productTitle">Product</h2>
                <Link className="title-box-link" to="create">Create New Product</Link>
            </div>
            <div className="product-box row">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((product) => (
                        <div className="product-item col-md-3 col-sm-3" key={product.id}>
                            <img className="product-item-image" src={product.image_url.replace(/"/g, '')} alt={product.name} />
                            <h6 className="product-item-title-name">{product.name}</h6>
                            <div className="product-item-box">
                                <div className="product-color">
                                    {product.Variations.map((variation, index) => (
                                        <p key={index} style={{ backgroundColor: variation.color }}></p>
                                    ))}
                                </div>
                                <h6 className="product-price">{parseInt(product.price).toLocaleString()}₫</h6>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p> // Thông báo nếu không có sản phẩm
                )}
            </div>
        </div>
    );
}

export default Product;