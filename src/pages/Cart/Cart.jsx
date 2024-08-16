import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { removeCart } from '../../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import CartProductItem from './CartProductItem';



function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto py-10 min-h-[70vh] ">
      <table className="table-auto scroll-p-20 w-full">
        <thead>
          <tr className="bg-[#87b106] text-white text-xl h-[60px]">
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        {cartItems.cartItems.length > 0 &&
          cartItems?.cartItems.map((item) => (
            <tbody className="text-center text-lg min-w-full " key={item._id}>
              <CartProductItem data={item}/>
            </tbody>
          ))}
      </table>

      <div className="flex justify-end ">
        <div className="bg-[#f8f8f8] w-2/5 border boeder-gray-300 my-4 p-2 ">
          <div className=" text-2xl font-bold text-center ">Giỏ hàng</div>
          <div>
            <tr className="text-xl">
              <td className="w-4/5">Tổng tiền:</td>
              <td className="w-[100px]">  {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(cartItems.totalMoney)}</td>
            </tr>
          </div>
        </div>
      </div>
      <Link className="flex justify-end" to="/account/checkout">
        {' '}
        <button className="bg-[#87b106] text-[#fff] text-lg w-[250px] my-4 py-2  ">Tiếp tục thanh toán</button>
      </Link>
    </div>
  );
}

export default Cart;
