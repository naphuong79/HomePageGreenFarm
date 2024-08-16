import { Navigate, Route, Routes } from 'react-router-dom';

import AdminLayout from '../Layout/AdminLayout';
import DefaultLayout from '../Layout/DefaultLayout';
import { AdminDashboard } from '../pages/Admin/AdminDashboard';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ShopDetail from '../pages/ProductDetail/ProductDetail';
import Shop from '../pages/Shop';
import Checkout from '../pages/Checkout/Checkout';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Account from '../pages/Account/Account';
import CreateProduct from '../pages/Admin/CreateProduct';
import Register from '../pages/Register/Register';
import TableUser from '../pages/Admin/TableUser';

import TableOrder from '../pages/Admin/TableOrder/TableOrder';
import TableProduct from '../pages/Admin/TableProduct';
import TableCategory from '../pages/Admin/TableCategory';
import TableVoucher from '../pages/Admin/TableVoucher/TableVoucher';
import EditProduct from '../pages/Admin/EditProduct';
import PrivateRoute from './PrivateRoute';
import { NotLoggedMiddleware } from './RouteMiddleware';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ShopDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route element={<NotLoggedMiddleware />}>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      <Route path="/account" element={<PrivateRoute allowedRoles={['admin', 'user']} />}>
        <Route element={<DefaultLayout />}>
          <Route path="dashboard" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Route>
      {/* Admin */}
      {/* <Route path="/admin" element={<PrivateRoute allowedRoles={['Admin']} />}> */}

      <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route index path="" element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="eidt-product/:id" element={<EditProduct />} />
          <Route path="user-manager" element={<TableUser />} />
          <Route path="product-manager" element={<TableProduct />} />
          <Route path="order-manager" element={<TableOrder />} />
          <Route path="category-manager" element={<TableCategory />} />
          <Route path="brand-manager" element={<TableVoucher />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/NotFound-404" />} />
      <Route path="/NotFound-404" element={<NotFound />} />
    </Routes>
  );
}
