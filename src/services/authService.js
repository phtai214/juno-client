// routes/AdminRoutes.js
import { Route, Redirect } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

const AdminRoutes = ({ component: Component, ...rest }) => {
    const isAdmin = true; // Điều kiện kiểm tra quyền admin (ví dụ lấy từ state)

    return (
        <Route
            {...rest}
            render={props =>
                isAdmin ? (
                    <AdminLayout>
                        <Component {...props} />
                    </AdminLayout>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default AdminRoutes;
