import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomerLayout from './layouts/CustomerLayout.js';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import Login from './pages/customer/Login.js';
import Register from './pages/customer/Register.js';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/customer/Products.js';
import Home from './pages/customer/Home.js';
import ProductDetail from './pages/customer/ProductDetail.js';
import Cart from './pages/customer/Cart.js';
import Checkout from './pages/customer/Checkout.js';
import Orders from './pages/admin/Orders';
import Employees from './pages/admin/Employees';
import Profile from './pages/customer/Profile.js';
import { checkAuth } from './redux/slices/authSlice'; // Action để kiểm tra trạng thái đăng nhập
import Product from "./pages/admin/Product.js";
import UsersPage from "./pages/admin/User.js";
import ProductCreateForm from "./pages/admin/ProductCreateForm.js"
import Cookies from 'js-cookie';
import UserView from "./pages/customer/UserView.js";
import ProductSearch from "./pages/customer/ProductSearch.js";
import OrderUpdate from "./pages/admin/UpdateOrder.js";
import NewProduct from "./pages/customer/NewProduct.js";
import AddEmployee from "./components/Admin/AddEmployee.js";
import EmployeePermissions from "./components/Admin/EmployeePermissions.js";
import ProductList from "./pages/customer/ProductList.js";
import ProductAll from "./pages/customer/ProductAll.js"
const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  // Kiểm tra trạng thái đăng nhập khi app load
  useEffect(() => {
    const userFromCookies = Cookies.get('user');
    if (userFromCookies) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Routes dành cho khách hàng */}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route path="sale-thuong-thuong" element={<Products />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="product/slug/:slug" element={<ProductDetail />} />
        <Route path="new-product" element={<NewProduct />} />
        <Route path="product/search" element={<ProductSearch />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} />
        <Route path="user-view/:id" element={<UserView />} />
        <Route path="product-all" element={<ProductAll />} />
        <Route path="/customer/product/BST/:category" element={<ProductList />} />
      </Route>

      {/* Routes dành cho admin */}
      {user?.role === 'admin' && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<UsersPage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/update/:id" element={<OrderUpdate />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/employee-permissions" element={<EmployeePermissions />} />
          <Route path="products" element={<Product />} />

          <Route path="products/create" element={<ProductCreateForm />} />

        </Route>
      )}

      {/* Routes dành cho nhân viên */}
      {user?.role === 'employee' && (
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<UsersPage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/update/:id" element={<OrderUpdate />} />
          <Route path="products" element={<Product />} />
          <Route path="products/create" element={<ProductCreateForm />} />
        </Route>
      )}

      {/* Routes đăng nhập/đăng ký */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Redirect mặc định */}
      <Route path="/" element={<Navigate to="/customer/sale-thuong-thuong" />} />
    </Routes>

  );
};

export default App;
