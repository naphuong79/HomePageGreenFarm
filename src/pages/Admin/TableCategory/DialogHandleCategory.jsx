import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { Input, Textarea } from '@material-tailwind/react';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../../features/Category/categoryApi.service';
import { errorNotify, successNotify } from '../../../components/Toast';
export default function DialogHandleCategory({ open, handle, id, item }) {
  const [createCategory, resultCategory] = useCreateCategoryMutation();
  const [updateCategory, resultUpdateCategory] = useUpdateCategoryMutation();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting , setFieldValue} =
    useFormik({
      initialValues: {
        name: '',
        description: '',
      },
      validationSchema: yup.object({
        name: yup.string().required('Vui lòng nhập tên danh mục !'),
      }),
      onSubmit: async (values) => {
        if (id === '') {
          createCategory(values)
            .unwrap()
            .then((res) => {
              successNotify('Thêm danh mục thành công');
              handle();
              setFieldValue('name', '');
              setFieldValue('description', '');
            })
            .catch((err) => {
              console.log(err);
              if (err.status !== 200) {
                errorNotify('Lỗi thêm danh mục');
              }
            });
        } else {
          updateCategory({
            id: id,
            body: values,
          })
            .unwrap()
            .then((res) => {
              successNotify('Cập nhật danh mục thành công');
              handle();
              setFieldValue('name', '');
              setFieldValue('description', '');
            })
            .catch((err) => {
              console.log(err);
              if (err.status !== 200) {
                errorNotify('Lỗi cập nhật danh mục');
              }
            });
        }
      },
    });

  useEffect(() => {
    
    if (id === '') {
      setFieldValue('name', '');
      setFieldValue('description', '');
    } else {
      setFieldValue('name', item?.name);
      setFieldValue('description', item?.description);
    }
  }, [id]);

  const closeModal = () => {
    handle();
    setFieldValue('name', '');
    setFieldValue('description', '');
  };

  return (
    <>
      <Dialog open={open} handler={closeModal}>
        <DialogHeader>Thêm danh mục</DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div className="w-full mb-3">
              <Input
                label="Tên danh mục"
                size="lg"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />
              <small className="text-center font-normal text-[#e40122]">{touched.name && errors.name}</small>
            </div>
            <div className="w-full">
              <Textarea name="description" onChange={handleChange} value={values.description} label="Mô tả" />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={closeModal} className="mr-1">
              <span>Hủy</span>
            </Button>
            {id === '' && (
              <Button variant="gradient" color="green" type="submit">
                <span>Lưu</span>
              </Button>
            )}
            {id !== '' && (
              <Button variant="gradient" color="green" type="submit">
                <span>Cập nhật</span>
              </Button>
            )}
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
