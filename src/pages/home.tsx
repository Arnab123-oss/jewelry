import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";
import { cartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductQuery("");

  const dispatch = useDispatch();

  const AddToCartHandlear = (cartItem: cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));

    toast.success("Product added to cart");
  };

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
          <Skeleton width="80vw" />
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
