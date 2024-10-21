// src/components/common/SearchBar.js
import React, { useState } from 'react';
import '../../style/components/common/SearchBar.scss'; // Đảm bảo import SCSS

const SearchBar = () => {
    const [isInputVisible, setIsInputVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsInputVisible(true);
    };

    const handleMouseLeave = () => {
        setIsInputVisible(false);
    };

    return (
        <div className="searchFormHeader" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <form className="searchHeader" action="/search">
                <div className="searchBox">
                    <input type="hidden" name="type" value="product" autoComplete="off" />
                    {isInputVisible && (
                        <input
                            type="text"
                            name="q"
                            className="searchInput"
                            placeholder=""
                            autoComplete="off"
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
        </div>
    );
};

export default SearchBar;
