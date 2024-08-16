import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { voucherApi } from "../features/Vourcher/voucherApi.service";
import { authApi } from "../features/Auth/authApi.service";
import { productApi } from "../features/Product/productApi.service";
import { categoryApi } from "../features/Category/categoryApi.service";
import { cartApi } from "../features/Cart/cartApi.service";
import { userApi } from "../features/User/userApi.service";

import authSlice from "../features/Auth/authSlice";
import cartSlice from "../features/Cart/cartSlice";

import { rtkQueryErrorLogger } from "./middleware";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "cart"],
};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer, 
    [voucherApi.reducerPath]: voucherApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    auth: authSlice,
    cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            authApi.middleware,
            productApi.middleware,
            categoryApi.middleware,
            voucherApi.middleware,
            cartApi.middleware,
            userApi.middleware,
            rtkQueryErrorLogger,
        ),

    devTools: import.meta.env.MODE !== "production",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
