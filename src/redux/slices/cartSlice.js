import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
            // Lưu giỏ hàng vào localStorage mỗi khi có thay đổi
            localStorage.setItem('cartItems', JSON.stringify(action.payload));
        },
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity; // Cập nhật số lượng
            } else {
                state.items.push(action.payload); // Thêm sản phẩm mới
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items)); // Lưu vào localStorage
        },
        updateQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = action.payload.quantity; // Cập nhật số lượng
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items)); // Lưu vào localStorage
        },
        removeItem: (state, action) => {
            const filteredItems = state.items.filter(item => item.id !== action.payload);
            state.items = filteredItems;
            localStorage.setItem('cartItems', JSON.stringify(state.items)); // Lưu vào localStorage
        },
    },
});

export const { setCartItems, addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
