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
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Variations</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((product) => (
                            <tr className="product-item" key={product.id}>
                                <td>
                                    <img className="product-item-image" src={product.image_url.replace(/"/g, '')} alt={product.name} />
                                </td>
                                <td>{product.name}</td>
                                <td>
                                    <div className="product-color">
                                        {product.Variations.map((variation, index) => (
                                            <span key={index} style={{ backgroundColor: variation.color, display: 'inline-block', width: '20px', height: '20px', marginRight: '5px' }}></span>
                                        ))}
                                    </div>
                                </td>
                                <td>{parseInt(product.price).toLocaleString()}₫</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products available.</td> {/* Thông báo nếu không có sản phẩm */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Product;