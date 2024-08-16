import { message, Upload, Typography, Button, Flex } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useCreateProductMutation } from '../../../features/Product/productApi.service';
import { Link, useNavigate } from 'react-router-dom';
import { successNotify, errorNotify } from '../../../components/Toast';
// import {
//   useLazyGetAllBrandsQuery,
//   useGetAllBrandsQuery,
//   useDeleteBrandMutation,
// } from '../../../features/Brand/brandApi.service';
import { useGetAllCategoriesQuery } from '../../../features/Category/categoryApi.service';

const fileList = [
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

function CreateProduct() {
  const navigate = useNavigate();
  const [createProduct, resultCreateProduct] = useCreateProductMutation();
  // const getAllBrand = useGetAllBrandsQuery({
  //   page: 1,
  //   limit: 10,
  // });

  const getAllCategory = useGetAllCategoriesQuery({
    page: 1,
    limit: 10,
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      description: '',
      description_summary: '',
      price: 0,
      sale_price: 0,
      stock: 0,
      category: '',
      imageCollection: [],
      imageMain: '',
      // brand: '',
      // color: [],
      // size: [],
    },
    validationSchema: yup.object({}),
    onSubmit: (values) => {
      createProduct(values)
        .unwrap()
        .then((res) => {
          successNotify('Thêm sản phẩm thành công');
          navigate('/admin/product-manager');
          console.log(res);
        })
        .catch((err) => {
          errorNotify('Thêm sản phẩm thất bại');
          console.log(err);
        });
    },
  });
  const imgMain = {
    name: 'image',
    action: 'http://localhost:5000/api/v1/upload/file',
    headers: {
      authorization: 'authorization-text',
    },

    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);

        setFieldValue('imageMain', `${info.file.response.url}`);
        console.log(info.file.response.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const imgCollection = {
    name: 'image',
    action: 'http://localhost:5000/api/v1/upload/file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const imageUrl = info.file.response.url;
        const updatedCollection = [...values.imageCollection, imageUrl];
        setFieldValue('imageCollection', updatedCollection);
        console.log(imageUrl);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <h2 className="font-bold text-[15px] my-[10px]">Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-[30px]">
          <div className="w-1/2">
            <div className="my-[10px]">
              <label>Tên sản phẩm</label>
              <Input
                placeholder="Tên sản phẩm"
                size="lg"
                name="name"
                required
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />
              <small className="text-center font-normal text-[#e40122]">{touched.name && errors.name}</small>
            </div>
            <div className="my-[10px]">
              <label>Số lượng</label>
              <Input
                type="number"
                min={0}
                placeholder="Số lượng"
                size="lg"
                name="stock"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.stock && errors.stock}
              />
              <small className="text-center font-normal text-[#e40122]">{touched.stock && errors.stock}</small>
            </div>
            <div className="my-[10px]">
              <label>Giá sản phẩm</label>
              <Input
                type="number"
                min={0}
                placeholder="Giá sản phẩm"
                size="lg"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && errors.price}
              />
              <small className="text-center font-normal text-[#e40122]">{touched.price && errors.price}</small>
            </div>
            <div className="my-[10px]">
              <label>Giá giảm</label>
              <Input
                type="number"
                min={0}
                placeholder="Giá giảm"
                size="lg"
                name="sale_price"
                value={values.sale_price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sale_price && errors.sale_price}
              />
              <small className="text-center font-normal text-[#e40122]">
                {touched.sale_price && errors.sale_price}
              </small>
            </div>
            <div className="my-[10px]">
              <Upload {...imgMain}>
                <Button icon={<UploadOutlined />}>Tải ảnh chính</Button>
              </Upload>
            </div>
            <div className="my-[40px]">
              <Upload {...imgCollection}>
                <Button icon={<UploadOutlined />}>Tải album ảnh</Button>
              </Upload>
            </div>
          </div>
          <div className="w-1/2">
            {/* Brand */}
            {/* <div className="my-[10px]">
              <label>Chọn thương hiệu</label>
              <select
                name="brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Chọn Brand"
                className="w-full border border-[#b1bfc6] rounded-[5px] h-[30px]"
              >
                <option value="">Lựa chọn thương hiệu</option>
                {getAllBrand?.data?.data?.map((brand, index) => (
                  <option key={brand?._id} value={brand?._id}>
                    {brand?.name}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Danh mục */}
            <div className="my-[10px]">
              <label>Chọn danh mục</label>
              <select
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Chọn danh mục"
                className="w-full border border-[#b1bfc6] rounded-[5px] my-[1px] h-[30px]"
              >
                <option value="">Lựa chọn danh mục</option>
                {getAllCategory?.data?.data?.map((category, index) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-[10px]">
              <label>Mô tả ngắn</label>
              <TextArea
                name="description_summary"
                value={values.description_summary}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                placeholder="Mô tả ngắn"
              />
            </div>
            <div className="my-[10px]">
              <label>Mô tả chi tiết</label>
              <TextArea
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                placeholder="Mô tả chi tiết"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-[#87b106] mt-5 h-[50px] p-4 flex items-center text-[18px]">
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
