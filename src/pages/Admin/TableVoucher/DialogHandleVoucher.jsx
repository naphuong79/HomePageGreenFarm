import React, { useEffect } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useCreateVoucherMutation, useDeleteVoucherMutation } from '../../../features/Vourcher/voucherApi.service';
import { Input, Textarea } from '@material-tailwind/react';
import { errorNotify, successNotify } from '../../../components/Toast';
export default function DialogHandleVoucher({ open, handle, id ,item }) {
  const [createVoucher, resultVoucher] = useCreateVoucherMutation();
  const [updateVoucher, resultUpdateVoucher] = useDeleteVoucherMutation();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Vui lòng nhập mã giảm giá !'),
    }),
    onSubmit: async (values) => {
      if (id === '') {
        createVoucher(values)
          .unwrap()
          .then((res) => {
            successNotify('Thêm mã giảm giá thành công');
            handle();
            setFieldValue('name', '');
            setFieldValue('description', '');
          })
          .catch((err) => {
            console.log(err);
            if (err.status !== 200) {
              errorNotify('Lỗi thêm mã giảm giá');
            }
          });
      } else {
        updateVoucher({
          id: id,
          body: values,
        })
          .unwrap()
          .then((res) => {
            successNotify('Cập nhật mã giảm giá thành công');
            handle();
            setFieldValue('name', '');
            setFieldValue('description', '');
          })
          .catch((err) => {
            console.log(err);
            if (err.status !== 200) {
              errorNotify('Lỗi cập nhật mã giảm giá');
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
      setFieldValue('name', item?.code);
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
        <DialogHeader>Thêm mã giảm giá</DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div className="w-full mb-3">
              <Input
                label="Tên mã giảm giá"
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
