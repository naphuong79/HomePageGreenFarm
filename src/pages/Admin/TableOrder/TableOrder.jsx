import { PencilIcon } from '@heroicons/react/24/solid';
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  DialogFooter,
  DialogBody,
  Dialog,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import DialogDetailOrder from './DialogDetailOrder';
import { useSelector } from 'react-redux';
import { useLazyGetAllOrdersQuery, useUpdateStatusOrderMutation } from '../../../features/Cart/cartApi.service';

const TABLE_HEAD = [
  'Mã đơn hàng',
  'Số lượng mặt hàng',
  'Tổng tiền',
  'Ngày mua hàng',
  'Khách hàng',
  'Ghi chú',
  'Trạng thái',
  'Chức năng',
];

function TableOrder() {
  const [getOder, resultOder] = useLazyGetAllOrdersQuery();
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [updateStatusOrder, resultUpdateStatusOrder] = useUpdateStatusOrderMutation();
  const [open, setOpen] = useState({
    open: false,
    status: '',
    id: '',
  });
  const classes = '';
  useEffect(() => {
    getOder({
      page: page,
      code: code,
      status: status,
    });
  }, [page, code, status]);

  const handleView = (id) => () => {
    setProductId(id);
    setIsOpen(true);
  };

  const handleUpdateStatus = () => {
    updateStatusOrder({
      id: open.id,
      status: open.status,
    });
    setOpen({
      open: false,
      id: '',
      status: '',
    });
  };

  return (
    <>
      <DialogDetailOrder
        isOpen={isOpen}
        handleOpen={() => {
          setIsOpen(!isOpen);
          setProductId('');
        }}
        productId={productId}
      />
      <Dialog
        size="sm"
        open={open.open}
        handler={() =>
          setOpen({
            open: false,
            id: '',
            status: '',
          })
        }
      >
        <DialogBody divider className="grid place-items-center gap-4 p-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4" className="text-center">
            Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này?
          </Typography>
          <Typography className="text-center font-normal">Bạn không thể hoàn tác hành động này.</Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
            onClick={() =>
              setOpen({
                open: false,
                id: '',
                status: '',
              })
            }
          >
            Hủy
          </Button>
          <Button variant="gradient" color="green" onClick={handleUpdateStatus}>
            Đồng ý
          </Button>
        </DialogFooter>
      </Dialog>
      <Card className="w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Quản lý đơn hàng
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem và quản lý đơn hàng
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  label="Tìm kiếm đơn hàng"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <div class="relative h-11">
                <select
                  name="role"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border border-[#cfd8dc] rounded-lg p-3"
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="paid">Đã giao hàng</option>
                  <option value="pending">Đang chờ xử lý</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Loại sản phẩm
                </label>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!resultOder.isFetching &&
                resultOder?.data?.data.map((oder, index) => {
                  const isLast = index === resultOder?.data?.data?.length - 1;
                  const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
                  return (
                    <tr>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {oder?.code}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {oder?.products?.length}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(oder?.total)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {moment(oder?.createdAt).format('DD/MM/YYYY')}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={oder?.user?.avatar} alt="" size="sm" />
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {oder?.user?.fullname}
                            </Typography>
                            <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                              {oder?.user?.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {oder?.note}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            // value={oder?.status === 'paid' ?  'paid' : oder?.status === 'cancelled' ?  'cancelled': 'pending'}
                            // color={oder?.status === 'paid' ? 'green' : oder?.status === 'pending' ? 'amber' : 'red'}
                            value={oder.status === 'paid' ? 'Đã giao hàng' : oder.status === 'pending'? 'Đang chờ xử lý': 'Đã hủy'}
                            color={oder.status === 'paid' ? 'green' : oder.status === 'pending' ? 'amber' : 'red'}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Xem chi tiết">
                          <IconButton variant="text" onClick={handleView(oder?._id)}>
                            <AiOutlineEye className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Cập nhập trạng thái">
                          <Menu>
                            <MenuHandler>
                              <IconButton variant="text" disabled={oder.status !== 'pending'}>
                                <AiOutlineEdit className="h-4 w-4" />
                              </IconButton>
                            </MenuHandler>
                            <MenuList>
                              <MenuItem
                                onClick={() =>
                                  setOpen({
                                    open: true,
                                    id: oder._id,
                                    status: 'paid',
                                  })
                                }
                              >
                                Đã thanh toán
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  setOpen({
                                    open: true,
                                    id: oder._id,
                                    status: 'cancelled',
                                  })
                                }
                              >
                                Hủy đơn
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default TableOrder;
