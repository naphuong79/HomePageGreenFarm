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
          {/* <img src="https://htmldemo.net/pullman/pullman/assets/img/banner/banner_1.2.jpg" alt="" />
          <img src="https://htmldemo.net/pullman/pullman/assets/img/banner/banner_1.3.jpg" alt="" /> */}
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
