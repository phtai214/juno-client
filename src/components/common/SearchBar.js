// src/components/common/SearchBar.js
import React, { useState } from 'react';
import '../../style/components/common/SearchBar.scss'; // Đảm bảo import SCSS

const products = [
    { id: 1, name: 'Sản phẩm 1', price: 100000, image: 'https://example.com/image1.jpg' },
    { id: 2, name: 'Sản phẩm 2', price: 150000, image: 'https://example.com/image2.jpg' },
    { id: 3, name: 'Sản phẩm 3', price: 200000, image: 'https://example.com/image3.jpg' },
];

const SearchBar = () => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleMouseEnter = () => {
        setIsInputVisible(true);
    };

    const handleMouseLeave = () => {
        setIsInputVisible(false);
        setSearchTerm('');
        setFilteredProducts([]);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Tìm kiếm sản phẩm
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Có thể thêm logic để xử lý tìm kiếm (ví dụ: chuyển đến trang kết quả)
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="searchFormHeader" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <form className="searchHeader" onSubmit={handleSubmit}>
                <div className="searchBox">
                    <input type="hidden" name="type" value="product" autoComplete="off" />
                    {isInputVisible && (
                        <input
                            type="text"
                            name="q"
                            className="searchInput"
                            placeholder="Tìm kiếm sản phẩm..."
                            autoComplete="off"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                    )}
                    {!isInputVisible && (
                        <span className="searchHint">Tìm kiếm</span>
                    )}
                    <span className="btnSearch">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3457 5.49982C11.3457 8.26112 9.10717 10.4996 6.34572 10.4996C3.58427 10.4996 1.3457 8.26112 1.3457 5.49982C1.3457 2.73851 3.58427 0.5 6.34572 0.5C9.10717 0.5 11.3457 2.73851 11.3457 5.49982Z" stroke="#2D2D2D" />
                            <line y1="-0.5" x2="4.94967" y2="-0.5" transform="matrix(0.70712 0.707094 -0.70712 0.707094 9.3457 9.50012)" stroke="#2D2D2D" strokeLinecap="round" />
                        </svg>
                    </span>
                    <input type="submit" className="btnSearchSubmit" style={{ display: 'none' }} />
                </div>
            </form>
            {isInputVisible && filteredProducts.length > 0 && (
                <ul className="searchResults">
                    {filteredProducts.map(product => (
                        <li key={product.id} className="searchResultItem">
                            <img src={product.image} alt={product.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <span>{product.name} - {product.price.toLocaleString()} VND</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;