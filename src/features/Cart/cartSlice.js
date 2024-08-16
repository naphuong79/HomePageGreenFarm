import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalMoney: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const newItem = action.payload;
            const index = state.cartItems.findIndex(
                (item) => item._id === newItem._id,
            );
            if (index >= 0) {
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        removeCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload,
            );
        },
        increaseQuantity: (state, action) => {
            const index = state.cartItems.findIndex(
                (item) => item._id === action.payload,
            );
            if (index >= 0) {
                state.cartItems[index].quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const index = state.cartItems.findIndex(
                (item) => item._id === action.payload,
            );
            if (index >= 0) {
                if (state.cartItems[index].quantity > 1) {
                    state.cartItems[index].quantity -= 1;
                } else if (state.cartItems[index].quantity === 1) {
                    state.cartItems = state.cartItems.filter(
                        (item) => item._id !== action.payload,
                    );
                }
            }
        },
        inputQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const index = state.cartItems.findIndex((item) => item._id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },
        removeAllCart: (state, action) => {
            state.cartItems = initialState.cartItems;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => {
                return action.type.startsWith(
                    "cart" || "remove" || "increase" || "decrease" || "input",
                );
            },
            (state, action) => {
                state.totalMoney = state.cartItems.reduce(
                    (total, item) => total + item.sale_price * item.quantity,
                    0,
                );
            },
        );
    },
});

const { reducer, actions } = cartSlice;
export const { addCart, removeCart, increaseQuantity, decreaseQuantity, inputQuantity, removeAllCart } =
    actions;
export default reducer;
