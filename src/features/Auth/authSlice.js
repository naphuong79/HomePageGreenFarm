import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './authApi.service';

const initialState = {
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    assignNewToken: (state, action) => ({
      ...state,
      accessToken: action.payload,
    }),
    setStatusNewUser: (state, action) => ({
      ...state,
      newUser: action.payload,
    }),
    setAuthCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    // Xử lý logic khi endpoint login account & login Google được fulfilled
    builder.addMatcher(
      isAnyOf(authApi.endpoints.login.matchFulfilled, authApi.endpoints.LoginGoogle.matchFulfilled, authApi.endpoints.register.matchFulfilled),
      (state, action) => {
        // Lưu thông tin user vào state khi login
        const response = action.payload;
        if (response?.status === 'success') {
          state.loggedIn = true;
          state.accessToken = response?.data?.token?.accessToken;
          state.refreshToken = response?.data?.token?.refreshToken;
          state.currentUser = response?.data.userData;
        } else {
          state.loggedIn = false;
          state.currentUser = null;
          state.accessToken = null;
        }
      }
    );
  },
});

const { reducer, actions } = authSlice;
export const {
  logout,
  clearLoginErrorMessage,
  assignNewToken,
  setStatusNewUser,
  setAuthCurrentUser,
} = actions;
export default reducer;
