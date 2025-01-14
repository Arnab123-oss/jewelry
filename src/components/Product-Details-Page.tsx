import { useState } from "react";
import Carousel from "./Carousel"; // Import the carousel component
import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productApi";
import { Skeleton } from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useProductDetailsQuery(params.id!);

  const { cartItems } = useSelector((state: RootState) => state.cartReducer);

  const productId = params.id;

  const { name, price, stock, category, photos } = data?.product || {
    name: "",
    photos: [""],
    category: "",
    stock: 0,
    price: 0,
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: productId!,
        photo: photos[0],
        name,
        price,
        stock,
        quantity,
      })
    );
    toast.success("Added to cart");
  };

  const incrementHandler = () => {
    setQuantity((prevQuantity) => Math.min(stock, prevQuantity + 1)); // Prevent exceeding stock
  };

  // Decrement handler
  const decrementHandler = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1)); // Prevent negative values
  };

  const isInCart = cartItems.some((item) => item.productId === productId);

  return (
    <div style={styles.container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {/* Left: Product Images */}
          <div style={styles.left}>
            <Carousel
              photos={photos}
              isHovered={false}
              duration={3000}
              height={452}
            />
          </div>

          {/* Right: Product Details */}
          <div style={styles.right}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1 style={styles.title}>{name}</h1>
              {isInCart && (
                <h1 style={styles.cartInfo}>
                  <IoCheckmarkCircleSharp fontSize={16} color="green" /> Already
                  added in Cart
                </h1>
              )}
            </div>

            <p style={styles.price}>${price.toFixed(2)}</p>
            <p style={styles.description}>{category}</p>
            <p style={{fontSize: "15px",color:stock > 0 ?"green":"red",fontWeight:"bold"}}>
              {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
            </p>

            <div style={styles.quantityContainer}>
              <label style={styles.quantityLabel}>Quantity:</label>
              <button onClick={decrementHandler} style={styles.quantityButton}>
                -
              </button>

              <p>{quantity}</p>

              <button onClick={incrementHandler} style={styles.quantityButton}>
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              style={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={stock === 0}
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    maxWidth: "900px",
    margin: "auto",
  },
  left: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "300px",
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minWidth: "300px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
   
  },
  cartInfo: {
    fontSize: "12px",
    display: "flex",
    gap: "6px",
    fontWeight: "lighter",
    margin: 0,
    color: "green",
  },
  price: {
    fontSize: "20px",
    color: "green",
    margin: 0,
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.5",
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  quantityLabel: {
    fontSize: "14px",
  },
  quantityButton: {
    width: "25px",
    padding: "2px",
    
  },
  addToCartButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductDetailsPage;
