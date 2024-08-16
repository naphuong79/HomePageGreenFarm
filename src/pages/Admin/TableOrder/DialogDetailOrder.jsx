import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
  Textarea,
  CardHeader,
  Chip,
} from '@material-tailwind/react';
import { useEffect } from 'react';
import {useLazyGetOneOrderQuery} from "../../../features/Cart/cartApi.service"

function DialogDetailOrder({ isOpen, handleOpen, productId }) {
  const [getOneOder, resultOneOder] = useLazyGetOneOrderQuery();

  

  useEffect(() => {
    if(productId) {
      getOneOder(productId);
    }
  }, [productId]);

  return (
    <>
     
     {productId !== '' && ( <Dialog open={isOpen} size="lg" handler={handleOpen} className="overflow-y-auto max-h-[90vh] relative">
        {true && (
          <div className="p-[50px]">
            <div className="flex gap-[50px]">
              <div className="w-2/5">
                <h1 className="font-bold text-2xl mb-10">Thông tin giao hàng</h1>
                <div className="space-y-3">
                  <Input label="Họ và tên" value={resultOneOder?.data?.data?.user?.fullname} />
                  <Input label="Email" value={resultOneOder?.data?.data?.user?.email} />
                  <Input label="Số điện thoại" name="phone" value={resultOneOder?.data?.data?.phone} />
                  <Textarea label="Địa chỉ" name="address" value={resultOneOder?.data?.data?.address} />
                  <Textarea label="Ghi chú" name="note" value={resultOneOder?.data?.data?.note} />
                </div>
              </div>
              <div className="w-3/5">
                <div className="flex justify-between items-center mb-10">
                  <h1 className="font-bold text-2xl">
                    Thông tin đơn hàng <span className="text-[14px] text-[#ff1f1f]">({resultOneOder?.data?.data?.quantity})</span>
                  </h1>
                  <div className="w-max">
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={resultOneOder?.data?.data?.status === 'paid' ? 'paid' : 'pending'}
                      color={resultOneOder?.data?.data?.status === 'paid' ? 'green' : resultOneOder?.data?.data?.status === 'pending' ? 'amber' : 'red'}
                    />
                  </div>
                </div>
                <div className="max-h-[50vh] overflow-y-auto">
                  {!resultOneOder.isFetching &&  resultOneOder?.data?.data?.products.map((item, index) =>{
                  const isLast = index === resultOneOder?.data?.data?.length - 1;
                    return(
                      <div className="flex w-full border-t border-[#bcbcbc] border-dashed">
                    <div className="w-[100px] py-2">
                      <img className="w-[80px] h-[80px] object-cover" src={item?.product?.imageMain} alt="" />
                    </div>
                    <div className="p-2 flex flex-col flex-1 justify-between">
                      <div className="flex gap-2 items-start">
                        <h3 className="text-[14px] font-bold">
                          <p>{item?.product?.name}</p>
                        </h3>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="bg-[#f5f5f5] h-[23px] px-2 rounded leading-[23px] text-[#677279] font-bold">
                          {item?.quantity}
                          <span className="text-[12px] font-semibold">
                            x{' '}
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(item?.price)}
                          </span>
                        </div>
                        <div className="font-bold text-[14px]">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(item?.price*item?.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                    )
                  })}
                  
                </div>
                <div className="border-t border-[#bcbcbc] p-3">
                  <div className="flex justify-between items-center font-bold text--[14px] mb-1">
                    <div>Tạm tính</div>
                    <div>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(resultOneOder?.data?.data?.total)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center font-bold text--[14px]">
                    <div>Phí vận chuyển</div>
                    <div className="text-[#ff1f1f]">
                      <div className="border w-[20px] border-[#bcbcbc]"></div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#bcbcbc] p-3">
                  <div className="flex justify-between items-center font-bold text-base">
                    <div>Tổng tiền</div>
                    <div className="text-[#ff1f1f] font-extrabold text-xl">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(resultOneOder?.data?.data?.total)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>)}
    </>
  );
}

export default DialogDetailOrder;
