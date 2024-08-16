import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl -translate-y-20 px-4 py-20 lg:px-6 lg:py-32">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-8 text-6xl font-extrabold tracking-tight text-orange-400">404</h1>
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900  dark:text-white">
            Trang bạn truy cập không tồn tại.
          </p>
          <p className="mb-4 font-light text-gray-500 dark:text-gray-400">Vui lòng kiểm tra lại.</p>
          <Link
            to="/"
            className="my-4 inline-flex rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
