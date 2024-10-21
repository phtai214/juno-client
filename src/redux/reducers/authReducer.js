import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo trạng thái mặc định
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
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
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload; // Lỗi đăng nhập
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        checkAuth(state) {
            // Kiểm tra xác thực, có thể được gọi để thiết lập trạng thái
            state.isAuthenticated = !!state.user; // Kiểm tra xem user có tồn tại không
        },
    },
});

// Xuất các action
export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    checkAuth, // Xuất checkAuth
} = authSlice.actions;

// Xuất reducer
export default authSlice.reducer;
