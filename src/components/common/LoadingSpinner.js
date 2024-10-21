//Hiển thị vòng quay tải khi dữ liệu đang được load.

import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    );
};

export default LoadingSpinner;
