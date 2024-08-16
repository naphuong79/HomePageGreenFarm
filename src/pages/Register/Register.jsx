import React, { useEffect, useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRegisterMutation } from '../../features/Auth/authApi.service';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/Auth/authSlice';

function Register() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [register, resultRegister] = useRegisterMutation();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: yup.object({
      fullname: yup.string().required('Vui lòng nhập họ và tên!'),
      email: yup.string().required('Vui lòng nhập email!').email('Email không đúng định dạng, vui lòng nhập lại!'),
      password: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự!').required('Vui lòng nhập mật khẩu!'),
      password_confirm: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp!'),
    }),
    onSubmit: (values) => {
      dispath(logout());
      register(values)
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res.status === 'success') {
            navigate('/login');
          }
        })
        .catch((err) => {
          setError(err.data.message);
          return;
        });
    },
  });
  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <div class="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
        <div class="relative grid mx-4 mb-4 mt-6 overflow-hidden text-white shadow-lg h-20 place-items-center rounded-xl bg-[#7aa93c] ">
          <h3 class="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
            Đăng ký
          </h3>
        </div>
        {error && <p className="text-center font-medium text-sm text-[#e40122]">{error}</p>}
        <div class="flex flex-col gap-4 p-6">
          <div class="min-w-[200px]">
            <Input
              label="Họ và tên"
              size="lg"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullname && errors.fullname}
            />
            <small className="text-center font-normal text-[#e40122]">{touched.fullname && errors.fullname}</small>
          </div>
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
          <div class="min-w-[200px]">
            <Input
              label="Mật khẩu"
              size="lg"
              name="password_confirm"
              type="password"
              value={values.password_confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password_confirm && errors.password_confirm}
            />
            <small className="text-center font-normal text-[#e40122]">
              {touched.password_confirm && errors.password_confirm}
            </small>
          </div>
        </div>
        <div class="p-6 pt-0">
          <Button type="submit" className="bg-[#7aa93c] w-full">
            Đăng Ký
          </Button>
          <p class="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
            Bạn đã có tài khoản?
            <Link to="/login" class="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-[#7aa93c]">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Register;
