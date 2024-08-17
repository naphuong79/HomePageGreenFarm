import ImgBig from '../../components/ImgBig';
import Supprort from '../../components/Support';
import HomeSlider from '../../components/HomeSlider';
import ImgSale from '../../components/ImgSale';
import CategoryItem from '../../components/CategoryItem';
import ShowHomeProduct from '../../components/ShowHomeProduct';
import ShowHomeProduct2 from '../../components/ShowHomeProduct2';

function Home() {
  return (
    <div>
      <HomeSlider />
      <div className="container mx-auto mb-20 space-y-10 px-20">
        <Supprort />
        <div className="flex justify-between">
          {/* <img src="" alt="" />
          <img src="" alt="" /> */}
        </div>
        <ShowHomeProduct />
        <ImgSale />
        <ShowHomeProduct2 />
      </div>
      <ImgBig />
      <div className="container mx-auto mb-20 space-y-10 pt-10 px-20">
        <CategoryItem />
      </div>
    </div>
  );
}

export default Home;
