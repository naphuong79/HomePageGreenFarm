import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';

import {
  Card,
  CardHeader,
  Input,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tooltip,
  Typography,
  DialogFooter,
  DialogBody,
  Dialog,
} from '@material-tailwind/react';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { BsTrash } from 'react-icons/bs';
import { useLazyGetAllUsersQuery, useUpdateRoleMutation, useDeleteUserMutation } from '../../../features/User/userApi.service';
import { AiOutlineEdit } from "react-icons/ai";
import { errorNotify, successNotify } from "../../../components/Toast";

const TABLE_HEAD = ['Tài khoản', 'Email', 'Vai trò', 'Ngày tạo', 'Chức năng'];

function TableUser() {
  const [deleteUser, resultDeleteUser] = useDeleteUserMutation();
  const [getUser, resultUser] = useLazyGetAllUsersQuery();
  const [updateRole, resultUpdateRole] = useUpdateRoleMutation();
  const [page, setPage] = useState(1);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const classes = '';
  const [open, setOpen] = useState({
    open: false,
    role: '',
    id: '',
    type: '',
  });

  useEffect(() => {
    getUser({
      page: page,
    });
  }, [page, role, email]);

  const handleAction = () => {
    if (open.type === 'delete') {
      deleteUser({
        id: open.id,
      })
        .unwrap()
        .then(() => {
          successNotify('Xóa tài khoản thành công');
        })
        .catch((err) => {
          errorNotify('Xóa tài khoản thất bại');
        });
    } else {
      updateRole({
        id: open.id,
        role: open.role,
      })
        .unwrap()
        .then(() => {
          successNotify('Thay đổi vai trò thành công');
        })
        .catch((err) => {
          errorNotify('Thay đổi vai trò thất bại');
        });
    }

    setOpen({
      open: false,
      role: '',
      id: '',
      type: '',
    });
  };

  return (
    <>
      <Dialog
        size="sm"
        open={open.open}
        handler={() =>
          setOpen({
            open: false,
            role: '',
            id: '',
            type: '',
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
            {open.type === 'delete'
              ? 'Bạn có chắc chắn muốn xóa tài khoản này?'
              : 'Bạn có chắc chắn muốn thay đổi vai trò của tài khoản này?'}
          </Typography>
          <Typography className="text-center font-normal">
            {open.type === 'delete'
              ? 'Bạn sẽ không thể hoàn tác hành động này. Sản phẩm sẽ bị xóa vĩnh viễn.'
              : 'Bạn sẽ không thể hoàn tác hành động này.'}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
            onClick={() =>
              setOpen({
                open: false,
                role: '',
                id: '',
                type: '',
              })
            }
          >
            Hủy
          </Button>
          <Button variant="gradient" color="green" onClick={handleAction}>
            Đồng ý
          </Button>
        </DialogFooter>
      </Dialog>
      <Card className="w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Danh sách người dùng
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Xem và quản lý người dùng
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="w-full md:w-72">
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Tìm kiếm email"
                  size="lg"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <div class="relative h-11">
                <select
                  name="role"
                  className="border border-[#cfd8dc] rounded-lg p-3"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-gray-900"
                >
                  <option value="">Tất cả vai trò</option>
                  {/* {!getAllRoles.isFetching &&
                                            getAllRoles?.data?.map(
                                                (item) => (
                                                    <option
                                                        key={item._id}
                                                        value={item._id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )} */}
                </select>
                <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Loại sản phẩm
                </label>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div> */}
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
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
              {resultUser?.data?.data.map((user,index) => {
                const isLast = index === resultUser?.data?.data?.length - 1;
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
                return (
                  <tr>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={user?.avatar} alt="" size="sm" />
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                          {user?.fullname}
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                            {user?.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {user?.email}

                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70"></Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={user?.role === 'admin' ? 'admin' : 'user'}
                          color={user?.role === 'admin' ? 'green' : 'blue-gray'}
                          
                        />
                      </div>
                      
                    </td>
                    
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {moment(user?.createdAt).format('DD/MM/YYYY')}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Thay đổi vai trò">
                        <Menu>
                          <MenuHandler>
                            <IconButton variant="text">
                              <AiOutlineEdit className="h-4 w-4" />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem
                              onClick={() =>
                                setOpen({
                                  open: true,
                                  role: 'admin',
                                  id: user._id,
                                  type: 'update_role',
                                })
                              }
                            >
                              Admin
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                setOpen({
                                  open: true,
                                  role: 'user',
                                  id: user._id,
                                  type: 'update_role',
                                })
                              }
                            >
                              User
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Tooltip>
                      <Tooltip content="Xóa tài khoản">
                        <IconButton
                          variant="text"
                          onClick={() =>
                            setOpen({
                              open: true,
                              role: '',
                              id: user._id,
                              type: 'delete',
                            })
                          }
                        >
                          <BsTrash className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Trang {page} trên 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
              Trước
            </Button>
            <Button variant="outlined" size="sm" onClick={() => setPage(page + 1)} disabled={page === 10}>
              Sau
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
export default TableUser;
