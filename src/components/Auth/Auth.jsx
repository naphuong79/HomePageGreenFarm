import { Button, Card, CardBody, CardFooter, Dialog, Input, Typography } from '@material-tailwind/react';
import { GoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { useLoginGoogleMutation, useLoginMutation, useRegisterMutation } from '../../features/Auth/authApi.service';
import { logout } from '../../features/Auth/authSlice';
import { errorNotify } from '../Toast/Toastify';

function AuthDialog() {
  const dispath = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [loginGoogle, resultLoginGoogle] = useLoginGoogleMutation();
  const [register, resultRegister] = useRegisterMutation();
  const [login, resultLogin] = useLoginMutation();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: yup.object({
      fullname: !isLogin && yup.string().required('Vui lòng nhập họ và tên!'),
      email: yup.string().required('Vui lòng nhập email!').email('Email không đúng định dạng, vui lòng nhập lại!'),
      password: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự!').required('Vui lòng nhập mật khẩu!'),
      password_confirm: !isLogin && yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp!'),
    }),
    onSubmit: async (values) => {
      dispath(logout());
      if (isLogin) {
        const res = await login(values)
          .unwrap()
          .then((res) => {
            if (res.data.status === 'success') {
              handleOpen();
            }
          })
          .catch((err) => {
            setError(err.data.message);
          });
      } else {
        const res = await register(values)
          .unwrap()
          .then((res) => {
            if (res.data.status === 'success') {
              handleOpen();
            }
          })
          .catch((err) => {
            setError(err.data.message);
          });
      }
    },
  });

  const clearError = () => {
    dispath(logout());
    setError(null);
  };

  const googleOnSuscess = (credentialResponse) => {
    loginGoogle({
      idToken: credentialResponse.credential,
      clientId: credentialResponse.clientId,
    });
  };

  const googleOnError = (err) => {
    errorNotify('Đăng nhập thất bại');
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full !bg-[#161729]"
      >
        <AiOutlineUser className="text-2xl text-white" />
      </button>
      <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent font-[Nunito] shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <img src="../../../../../logo.png" alt="logo" width={200} className="mx-auto my-7 mb-4" />
              <Typography variant="h4" color="blue-gray" className="text-center font-[Nunito] font-bold">
                {isLogin ? 'Đăng nhập' : 'Đăng ký'}
              </Typography>
              <Typography className="mb-3 text-center font-normal" variant="paragraph" color="gray">
                {isLogin
                  ? 'Nhập email và mật khẩu để đăng nhập'
                  : 'Đăng ký trở thành viên tại Hobbiverse để nhận được những ưu đãi siêu hot'}
              </Typography>
              {error && <p className="text-center text-sm font-medium text-[#e40122]">{error}</p>}
              {!isLogin && (
                <div>
                  <Input
                    label="Họ và tên"
                    size="lg"
                    name="fullname"
                    value={values.fullname}
                    onClick={clearError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullname && errors.fullname}
                  />
                  <small className="text-center font-normal text-[#e40122]">
                    {touched.fullname && errors.fullname}
                  </small>
                </div>
              )}
              <div>
                <Input
                  label="Email"
                  size="lg"
                  name="email"
                  type="email"
                  value={values.email}
                  onClick={clearError}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />
                <small className="text-center font-normal text-[#e40122]">{touched.email && errors.email}</small>
              </div>
              <div>
                <Input
                  label="Mật khẩu"
                  size="lg"
                  name="password"
                  type="password"
                  value={values.password}
                  onClick={clearError}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />
                <small className="text-center font-normal text-[#e40122]">{touched.password && errors.password}</small>
              </div>
              {!isLogin && (
                <div>
                  <Input
                    label="Mật khẩu"
                    size="lg"
                    name="password_confirm"
                    type="password"
                    value={values.password_confirm}
                    onClick={clearError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password_confirm && errors.password_confirm}
                  />
                  <small className="text-center font-normal text-[#e40122]">
                    {touched.password_confirm && errors.password_confirm}
                  </small>
                </div>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              {isLogin ? (
                <Button
                  // onClick={handleOpen}
                  type="submit"
                  fullWidth
                  className={`${
                    !resultLogin.isLoading && 'border border-[#e40122] hover:bg-transparent hover:text-[#e40122]'
                  } mt-3 block w-full rounded-md bg-[#e40122] py-2 text-center font-[Nunito] font-bold duration-300`}
                >
                  {resultLogin.isLoading ? (
                    <div>
                      <div role="status" className="flex items-center justify-center gap-3">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 animate-spin fill-white text-gray-200 dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="font-medium text-white">Đang xác thực...</span>
                      </div>
                    </div>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              ) : (
                <Button
                  // onClick={handleOpen}
                  type="submit"
                  fullWidth
                  className="mt-3 block w-full rounded-md border border-[#e40122] bg-[#e40122] py-2 text-center font-[Nunito] font-bold text-white duration-300 hover:bg-transparent hover:text-[#e40122]"
                >
                  {resultRegister.isLoading ? (
                    <div>
                      <div role="status" className="flex items-center justify-center gap-3">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 animate-spin fill-white text-gray-200 dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="font-medium text-white">Đang xác thực...</span>
                      </div>
                    </div>
                  ) : (
                    'Đăng ký'
                  )}
                </Button>
              )}

              <div className="my-2 text-center text-[14px]">
                <span className="font-[Nunito] font-bold">Hoặc</span>
              </div>

              <div className="w-[360px]">
                <GoogleLogin
                  onSuccess={googleOnSuscess}
                  onError={googleOnError}
                  width="360px"
                  auto_select
                  useOneTap
                  pop
                  true
                />
              </div>
              {isLogin ? (
                <Typography variant="small" className="mt-4 flex justify-center font-[Nunito]">
                  Bạn chưa có tài khoản?
                  <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-[Nunito] font-bold hover:text-[#e40122]"
                    onClick={() => setIsLogin(false)}
                  >
                    Đăng ký
                  </Typography>
                </Typography>
              ) : (
                <Typography variant="small" className="mt-4 flex justify-center font-[Nunito]">
                  Bạn đã có tài khoản?
                  <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-[Nunito] font-bold hover:text-[#e40122]"
                    onClick={() => setIsLogin(true)}
                  >
                    Đăng nhập
                  </Typography>
                </Typography>
              )}
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}

export default AuthDialog;
