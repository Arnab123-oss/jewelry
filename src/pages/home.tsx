import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import  { Skeleton } from "../components/loader";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductQuery("");

  const AddToCartHandlear = () => {};

  if (isError)
    toast.error(
      "An error occurred while fetching the latest products. Please try again later."
    );

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
        {isLoading ? (
          <Skeleton width="80vw"/>
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              photo={i.photo}
              handler={AddToCartHandlear}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
