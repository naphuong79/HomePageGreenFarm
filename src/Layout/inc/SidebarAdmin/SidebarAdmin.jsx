import React from 'react';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandShopee} from "react-icons/tb";
import { Menu } from 'antd';
import {useNavigate } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Dashboard ', '/admin/dashboard',<MdOutlineDashboard />),
  getItem('Quản lý sản phẩm', 'sub2', <MdDashboardCustomize  />, [
    getItem('Tất cả sản phẩm', '/admin/product-manager'),
    getItem('Thêm sản phẩm', '/admin/create-product'),
  ]),
  getItem('Quản lý người dùng', 'sub4', <FaRegUser  />, [
    getItem('Tất cả người dùng', '/admin/user-manager'),
  ]),
  getItem('Quản lý danh mục', 'sub6', <MdOutlineCategory   />, [
    getItem('Tất cả danh mục', '/admin/category-manager'),
  ]),
  getItem('Quản lý voucher', 'sub7', <TbBrandShopee   />, [
    getItem('Tất cả voucher', '/admin/Brand-manager'),
  ]),
  getItem('Quản lý đơn hàng', 'sub5', <IoBagHandleOutline  />, [
    getItem('Tất cả đơn hàng', '/admin/order-manager'),
  ]),
  
];

function SidebarAdmin() {
    const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
    console.log('click ', e);
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        style={{
          width: '100%',
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  );
}

export default SidebarAdmin;
