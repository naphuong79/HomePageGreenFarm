import { Radio } from '@material-tailwind/react';
import ProductItem from '../../components/ProductItem';
import Pagination from '../../components/Pagination';
import { useLazyGetAllProductsQuery } from '../../features/Product/productApi.service';
import { useGetAllCategoriesQuery } from '../../features/Category/categoryApi.service';
import { useEffect, useState } from 'react';
// import { useLazyGetAllVouchersQuery } from '../../features/Vourcher/voucherApi.service';

function Shop() {
  const [category, setCategory] = useState('');
  // const [brand, setBrand] = useState('');
  const [page, setPage] = useState(1);
  const [getproducts, resultProducts] = useLazyGetAllProductsQuery();
  useEffect(() => {
    getproducts({
      page: page, 
      limit: 9,
      category : category,
      // brand : brand,
    });
  }, [page,category]);
  const categories = useGetAllCategoriesQuery({
    page: 1,
    limit: 1000,
  });
  // const brands = useGetAllBrandsQuery({
  //   page: 1,
  //   limit: 1000,
  // });

// const [selectedOption, setSelectedOption] = useState();
// const [filteredProducts, setFilteredProducts] = useState([]);



// useEffect(() => {
//   if (selectedOption) {
//     const filtered = resultProducts?.data?.data.filter(product => product.category === selectedOption);
//     setFilteredProducts(filtered);
//   }else{
//     setFilteredProducts(resultProducts)
//   }
// },[selectedOption])

  return (
    <div className="container mx-auto p-20">
      <div className="flex">
        <div className=" w-1/4 ">
          <div className="text-black font-bold text-base uppercase">Thể loại</div>
          <ul>
            <li className="inline-grid grid-cols-1">
              {categories?.data?.data.map((category) => (
                <Radio id='category' name="category" color="green" label={category?.name} value={category?._id} onChange={ () => setCategory(category?._id)}   />
              ))}
            </li>
          </ul>
          {/* <div className="text-black font-bold text-base uppercase mt-4">Thương hiệu</div>
          <ul>
            <li className="inline-grid grid-cols-1 ">
              {brands?.data?.data.map((brands) => (
                <Radio id='brands' name="brands" color="green" label={brands?.name} value={brands?._id}  onChange={ () => setBrand(brands?._id)}/>
              ))}
            </li>
          </ul> */}
        </div>
        <div className="w-3/4 grid grid-cols-3 gap-4">
           {resultProducts?.data?.data.map((product) => (
            <ProductItem data={product} />
          ))}
          <div className="col-span-3 flex justify-center">
            <Pagination
              totalPage={resultProducts?.data?.totalPages}
              currentPage={resultProducts?.data?.page}
              handleSelectPage={(page) => {
                getproducts({
                  page: page,
                  limit: 9,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
