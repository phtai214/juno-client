//hiển thị đường dẫn giúp người dùng biết họ đang ở đâu trên trang web.

import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ crumbs }) => {
    return (
        <nav>
            <ul>
                {crumbs.map((crumb, index) => (
                    <li key={index}>
                        <Link to={crumb.path}>{crumb.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
