import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, inputQuantity } from '../../features/Cart/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { useFormatCurrency } from '../../hooks/useFormatNumber';
import { removeCart } from '../../features/Cart/cartSlice';
function CartProductItem({ data }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(data?.quantity);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(increaseQuantity(data?._id));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decreaseQuantity(data?._id));
    }
  };

  useEffect(() => {
    if (isNaN(quantity)) {
      setQuantity(1);
    } else if (Number(quantity) < 1) {
      errorNotify('Số lượng phải lớn hơn 0');
    } else {
      if (quantity > 100) {
        errorNotify('Số lượng phải nhỏ hơn 100');
        setQuantity(100);
      }
      dispatch(
        inputQuantity({
          id: data?._id,
          quantity: Number(quantity),
        }),
      );
    }
  }, [quantity]);
  return (
    <>
      <tr className="border border-[#ccc]">
        <td className="w-32 ml justify-center items-center">
          <Link to="#">
            <img src={data?.imageMain} alt="" />
          </Link>
        </td>
        <td>
          <Link to="#">{data?.name}</Link>
        </td>
        <td className='p-8'>{useFormatCurrency(data?.sale_price)}</td>
        
          <td className="w-[100px]">
            <div className="border border-[#dadbdd] h-[30px] ">
              <button className="border-r border-[#dadbdd] w-[25px] h-full" onClick={handleDecreaseQuantity}>
                -
              </button>
              <input
                className="w-[30px] focus:border-none h-full focus:outline-none px-auto text-center bg-[#ededed]"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button className="border-l border-[#dadbdd] w-[25px] h-full" onClick={handleIncreaseQuantity}>
                +
              </button>
            </div>
          </td>
     

        <td className="w-[100px] p-8">{useFormatCurrency(data?.sale_price * data?.quantity)}</td>
        <td className="w-[100px] pl-8 text-2xl" onClick={() => dispatch(removeCart(data?._id))}>
          {' '}
          <MdDelete />
        </td>
      </tr>
    </>
  );
}

export default CartProductItem;
