import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
  const AddToCartHandlear = () => {};

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      
      <main>
        <ProductCard
          productId="4h4j74jh2"
          name="Punjabi kalka design for men "
          price={2543}
          stock={254}
          photo="https://i.pinimg.com/originals/a6/a1/dc/a6a1dc0f04d00cdcdbc1d89a0dad623c.jpg"
          handler={AddToCartHandlear}
        />
                <ProductCard
          productId="4h4j74jh2"
          name="Punjabi kalka design for men "
          price={2543}
          stock={254}
          photo="https://i.pinimg.com/originals/a6/a1/dc/a6a1dc0f04d00cdcdbc1d89a0dad623c.jpg"
          handler={AddToCartHandlear}
        />
      </main>
    </div>
  );
};

export default Home;
