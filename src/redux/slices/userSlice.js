// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
    name: '',
    id: 0,
    email: '',
    avatar: '',
    role: false,
};

// Tạo slice cho user
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action để set user
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.role = action.payload.role;
        },
        // Có thể thêm nhiều action khác nếu cần
        clearUser: (state) => {
            state.id = 0;
            state.name = '';
            state.email = '';
            state.avatar = '';
            state.role = false;
        },
    },
});

// Export các action
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
