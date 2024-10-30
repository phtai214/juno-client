import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Thư viện js-cookie để thao tác với Cookies

// Khởi tạo trạng thái mặc định
const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null, // Lấy user từ Cookies nếu có
  isAuthenticated: !!Cookies.get("user"), // Xác định trạng thái đăng nhập dựa trên Cookies
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload; // Người dùng sau khi đăng nhập
      Cookies.set("user", JSON.stringify(action.payload)); // Lưu user vào Cookies
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Lỗi đăng nhập
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("user"); // Xóa Cookies khi đăng xuất
    },
    checkAuth(state) {
      state.isAuthenticated = !!state.user; // Kiểm tra xem user có tồn tại không
    },
  },
});

// Xuất các action
export const { loginStart, loginSuccess, loginFailure, logout, checkAuth } =
  authSlice.actions;

// Xuất reducer
export default authSlice.reducer;
