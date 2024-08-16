import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Ảnh sản phẩm',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Tên sản phẩm',
    width: 150,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Giá',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Số lượng',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Tổng',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

function ProductManager() {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 600,
        }}
      />
    </div>
  );
}

export default ProductManager;
