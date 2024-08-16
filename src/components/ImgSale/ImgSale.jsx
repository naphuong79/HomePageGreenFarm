import { Link } from 'react-router-dom';
function ImgSale() {
  return (
    <>
      <div className="flex justify-center items-center gap-10">
        <Link>
          <img src="https://themewagon.github.io/fruitables/img/featur-1.jpg" alt="" />
        </Link>

        <Link>
          <img src="https://themewagon.github.io/fruitables/img/featur-2.jpg" alt="" />
        </Link>

        <Link>
          <img src="https://themewagon.github.io/fruitables/img/featur-3.jpg" alt="" /> 
        </Link>
      </div>
    </>
  );
}

export default ImgSale;
