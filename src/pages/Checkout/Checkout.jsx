import React from 'react';
import { Input } from '@material-tailwind/react';
import { Select, Option } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFormatCurrency } from '../../hooks/useFormatNumber';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { errorNotify, successNotify } from '../../components/Toast/Toastify';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCreateOrderMutation } from '../../features/Cart/cartApi.service';
import { removeAllCart } from "../../features/Cart/cartSlice";


function Checkout() {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [isRemember, setIsRemember] = useState(true);
  const [createOrder, resultCheckout] = useCreateOrderMutation();

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      navigate('/');
    }
  }, [cart.cartItems]);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      address: localStorage.getItem('address') || '',
      phone: localStorage.getItem('phone') || '',
      note: '',
    },
    validationSchema: yup.object({
      address: yup.string().required('Vui lòng nhập địa chỉ'),
      phone: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^[0-9]+$/, 'Vui lòng nhập số'),
      note: yup.string(),
    }),
    onSubmit: async (values) => {
      if (isRemember) {
        localStorage.setItem('address', values.address);
        localStorage.setItem('phone', values.phone);
      }

      const orderData = {
        user: auth.currentUser._id,
        products: [
          ...cart.cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            price: item.sale_price ? item.sale_price : item.price,
          })),
        ],
        total: cart.totalMoney,
        address: values.address,
        phone: values.phone,
        note: values.note,
      };

      createOrder(orderData)

        .unwrap()
        .then(() => {
          dispath(removeAllCart());
          successNotify('Thanh toán thành công!');
          navigate('/');
        })
        .catch((err) => {
          errorNotify('Thanh toán thất bại. Vui lòng thử lại!');
          console.log(err);
        });
    },
  });
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems?.cartItems);
  return (
    <form onSubmit={handleSubmit} action="">
      <div className="container mx-auto flex gap-[30px]">
        <div className="w-1/2 py-20">
          <h5 className="pb-[15px] border border-b-[#e5e5e5] border-t-transparent border-x-transparent font-bold text-[18px]">
            Chi tiết thanh toán
          </h5>
          <div className="mt-5">
            <Input label="Họ tên" disabled defaultValue={auth.currentUser.fullname} />
          </div>
          <div className="mt-5">
            <Input label="Email" disabled defaultValue={auth.currentUser.email} />
          </div>
          <div className="mt-5">
            <Input
              label="Địa chỉ"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && errors.address}
            />
          </div>
          <div className="mt-5">
            <Input
              label="Số điện thoại"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && errors.phone}
            />
          </div>
          <div class="relative w-full min-w-[200px] mt-5">
            <textarea
              class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              name="note"
              value={values.note}
              onChange={handleChange}
            ></textarea>
            <label
              class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Ghi chú
            </label>
          </div>
        </div>
        <div className="w-1/2 py-[80px]">
          <h5 className="text-[18px] font-bold pb-[15px] border border-b-[#e5e5e5] border-t-transparent border-x-transparent">
            Đơn hàng của bạn
          </h5>

          <table className="w-full min-w-max table-auto text-left mt-[30px] border-collapse border border-slate-600">
            <thead>
              <tr className="text-center">
                <th className="border border-slate-300 p-4">Sản phẩm</th>
                <th className="border border-slate-300 p-4">Tổng cộng</th>
              </tr>
            </thead>

            <tbody>
              {cartItems?.cartItems.map((item) => (
                <tr className="">
                  <td className="border border-slate-300 w-1/2 p-4">
                    {item.name} x {item.quantity}
                  </td>
                  <td className="border border-slate-300 bg-blue-gray-50/50 w-1/2 text-center">
                    {useFormatCurrency(item?.sale_price * item?.quantity)}
                  </td>
                </tr>
              ))}
              <tr className="text-center">
                <td className="border border-slate-300 w-1/2 py-4">Tổng</td>
                <td className="border border-slate-300 bg-blue-gray-50/50 w-1/2 text-center font-bold text-5">
                  {useFormatCurrency(cartItems.totalMoney)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-10">
            <div className="flex">
              <input type="checkbox" name="" id="" />
              <span className="pl-5">Tôi đã đọc và đồng ý với các điều khoản và điều kiện của trang web.</span>
            </div>
            <button type="submit" className="h-[45px] px-[25px] bg-[#87b106] mt-5 text-[#fff]">
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Checkout;
