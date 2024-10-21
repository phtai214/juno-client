import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice'; // Import các reducer từ authSlice

// Tạo action async cho việc đăng nhập
export const login = createAsyncThunk(
    'auth/login',
    async (userCredentials, { dispatch, rejectWithValue }) => {
        dispatch(loginStart()); // Bắt đầu quá trình đăng nhập
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });

            if (!response.ok) {
                throw new Error('Đăng nhập thất bại');
            }

            const data = await response.json();
            dispatch(loginSuccess(data.user)); // Nếu thành công, dispatch loginSuccess
        } catch (error) {
            dispatch(loginFailure(error.message)); // Nếu lỗi, dispatch loginFailure
            return rejectWithValue(error.message); // Trả về lỗi
        }
    }
);
