import { message, Upload } from 'antd';
import { Input, Typography } from 'antd';
const { TextArea } = Input;
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useUpdateProductMutation, useLazyGetOneProductQuery } from '../../../features/Product/productApi.service';
import { Link, useNavigate } from 'react-router-dom';
import { successNotify, errorNotify } from '../../../components/Toast';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetAllCategoriesQuery } from '../../../features/Category/categoryApi.service';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateProduct, resultUpdateProduct] = useUpdateProductMutation();
  const [getOneProduct, resultGetOneProduct] = useLazyGetOneProductQuery();

  const getAllCategory = useGetAllCategoriesQuery({
    page: 1,
    limit: 10,
  });
  const [fileList, setFileList] = useState([]);
  const [fileListCollection, setFileListCollection] = useState([]);
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
    },
    validationSchema: yup.object({}),
    onSubmit: (values) => {
      updateProduct({
        id: id,
        body: values,
      })
        .unwrap()
        .then((res) => {
          successNotify('Cập nhật sản phẩm thành công');
          navigate('/admin/product-manager');
          console.log(res);
        })
        .catch((err) => {
          errorNotify('Cập nhật sản phẩm thất bại');
          console.log(err);
        });
    },
  });
  useEffect(() => {
    getOneProduct({ id });
  }, [id]);

    
  useEffect(() => {
    setFieldValue('name', resultGetOneProduct?.data?.data?.name);
    setFieldValue('description', resultGetOneProduct?.data?.data?.description);
    setFieldValue('price', resultGetOneProduct?.data?.data?.price);
    setFieldValue('sale_price', resultGetOneProduct?.data?.data?.sale_price);
    setFieldValue('stock', resultGetOneProduct?.data?.data?.stock);
    setFieldValue('imageCollection', resultGetOneProduct?.data?.data?.imageCollection);
    setFieldValue('imageMain', resultGetOneProduct?.data?.data?.imageMain);
    setFieldValue('category', resultGetOneProduct?.data?.data?.category?._id);
    setFieldValue('description_summary', resultGetOneProduct?.data?.data?.description_summary);
    setFileList([{
      uid: '-1',
      name: 'imageMain.jpg',
      status: 'done',
      url: resultGetOneProduct?.data?.data?.imageMain,
      thumbUrl: resultGetOneProduct?.data?.data?.imageMain,
    }]);
    const imageCollection = resultGetOneProduct?.data?.data?.imageCollection.map((image, index) =>  {
      return{
        uid: index,
        name: 'imageCollection.jpg',
        status: 'done',
        url: image,
        thumbUrl: image,
      }
     
    })
    
    console.log(imageCollection);
    setFileListCollection(imageCollection)
  }, [id, resultGetOneProduct]);
  const imgMain = {
    name: 'image',
    action: 'http://localhost:5000/api/v1/upload/file',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: () => {
      setFileList([{
        uid: '-1',
        name: 'imageMain.jpg',
        status: 'done',
        url: resultGetOneProduct?.data?.data?.imageMain,
        thumbUrl: resultGetOneProduct?.data?.data?.imageMain,
      }]);
      return false;
    },
    fileList,
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
  console.log(imgMain);
  const imgCollection = {
    name: 'image',
    action: 'http://localhost:5000/api/v1/upload/file',
    headers: {
      authorization: 'authorization-text',
    },
    fileListCollection,
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
  console.log(imgCollection);
  return (
    <div>
      <h2 className="font-bold text-[15px] my-[10px]">Cập nhật sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-[30px]">
          <div className="w-1/2">
            <div className="my-[10px]">
              <Typography.Title level={5}>Tên sản phẩm</Typography.Title>
              <Input
                placeholder="Tên sản phẩm`"
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
              <Typography.Title level={5}>Số lượng</Typography.Title>
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
              <Typography.Title level={5}>Giá sản phẩm</Typography.Title>
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
              <Typography.Title level={5}>Giá giảm</Typography.Title>
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
              <Typography.Title level={5}>Ảnh chính</Typography.Title>
              <Upload defaultFileList={[...fileList]} {...imgMain}>
                <Button icon={<UploadOutlined />}>Tải ảnh chính</Button>
              </Upload>
            </div>
            <div>
              <Typography.Title level={5}>Album ảnh</Typography.Title>
              <Upload defaultFileList={[...fileListCollection]} {...imgCollection}>
                <Button icon={<UploadOutlined />}>Tải album ảnh</Button>
              </Upload>
            </div>

            <div>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                defaultFileList={[...fileList]}
              >
                <Button className="mt-[px]" icon={<UploadOutlined />}>
                  Tải ảnh
                </Button>
              </Upload>
              <br />
              <br />
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                defaultFileList={[...fileList]}
                className="upload-list-inline  "
              >
                <Button className="mt-[-10px]" icon={<UploadOutlined />}>
                  Bộ sưu tập
                </Button>
              </Upload>
            </div>
          </div>
          <div className="w-1/2">
            {/* Danh mục */}
            <Typography.Title level={5}>Chọn danh mục</Typography.Title>
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
            <div className="my-[10px]">
              <Typography.Title level={5}>Mô tả ngắn</Typography.Title>
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
              <Typography.Title level={5}>Mô tả chi tiết</Typography.Title>
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
            Cập nhật sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
