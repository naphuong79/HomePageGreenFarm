import { Input, Button, Checkbox } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/Auth/authSlice';
import { useLoginMutation } from '../../features/Auth/authApi.service';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

function Login() {
  const [login, resultLogin] = useLoginMutation();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [error, setError] = useState(null);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().required('Vui lòng nhập email!').email('Email không đúng định dạng, vui lòng nhập lại!'),
      password: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự!').required('Vui lòng nhập mật khẩu!'),
    }),
    onSubmit: async (values) => {
      dispath(logout());

      const res = await login(values)
        .unwrap()
        .then((res) => {
          if (res.status === 'success') {
            navigate('/');
          }
        })
        .catch((err) => {
          setError(err.data.message);
          return;
        });
    },
  });
  return (
    <div className="flex justify-center items-center">
      <div class="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
        <div class="relative grid mx-4 mb-4 mt-6 overflow-hidden text-white shadow-lg h-20 place-items-center rounded-xl bg-[#7aa93c] ">
          <h3 class="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
            Đăng nhập
          </h3>
        </div>
        {error && <p className="text-center font-medium text-sm text-[#e40122]">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div class="flex flex-col gap-4 p-6">
            <div class="min-w-[200px]">
              <Input
                label="Email"
                size="lg"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              <small className="text-center font-normal text-[#e40122]">{touched.email && errors.email}</small>
            </div>
            <div class="min-w-[200px]">
              <Input
                label="Mật khẩu"
                size="lg"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <small className="text-center font-normal text-[#e40122]">{touched.password && errors.password}</small>
            </div>
            <div class="min-w-[200px] -ml-[11.5px]">
              <Checkbox label="Lưu mật khẩu" />
            </div>
          </div>
          <div class="p-6 pt-0">
            <Button type="submit" className="bg-[#7aa93c] w-full">
              Đăng nhập
            </Button>
            <p class="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
              Bạn chưa có tài khoản?
              <Link
                to="/register"
                class="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-[#7aa93c]"
              >
                Đăng ký
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
