import { Link } from 'react-router-dom';
function CategoryItem() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div>
        <h1 className="font-black pb-[30px] text-2xl">Shop</h1>
        <p className="pb-[30px] text-[#555555]">Kiet ngu</p>
        <div>
          <img src="https://htmldemo.net/pullman/pullman/assets/img/category/group-1.jpg" className="w-full" />
        </div>
      </div>
      <div>
        <h1 className="font-black pb-[30px] text-2xl">Shop</h1>
        <p className="pb-[30px] text-[#555555]">Kiet ngu</p>
        <div>
          <img src="https://htmldemo.net/pullman/pullman/assets/img/category/group-1.jpg" className="w-full" />
        </div>
      </div>
      <div>
        <h1 className="font-black pb-[30px] text-2xl">Shop</h1>
        <p className="pb-[30px] text-[#555555]">Kiet ngu</p>
        <div>
          <img src="https://htmldemo.net/pullman/pullman/assets/img/category/group-1.jpg" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;
