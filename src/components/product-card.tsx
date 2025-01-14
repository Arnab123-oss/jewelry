import { FaPlus } from "react-icons/fa";
// import { server } from "../redux/store";
import { cartItem } from "../types/types";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import { useState } from "react";

type ProductsProps = {
  productId: string;
  photos: string[];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: cartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photos,
  name,
  price,
  stock,
  handler,
}: ProductsProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)} // Pause auto-slide
      onMouseLeave={() => setIsHovered(false)} // Resume auto-slide
    >
      {/* {photos &&
        photos.length > 0 &&
        photos.map((photo, i) => <img src={photo} alt={name} key={i} />)} */}
      <Carousel
        photos={photos}
        isHovered={isHovered}
        duration={Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000}
      />

      <p>{name}</p>
      <span>₹{price}</span>

      <div
        className="add-to-cart"
        onClick={() => {
          navigate(`/product/${productId}`);
        }}
      >
        <button
          onClick={(event) => {
            event.stopPropagation(); // Prevent the click from propagating to the parent div
            handler({
              productId,
              photo: photos[0],
              name,
              price,
              stock,
              quantity: 1,
            });
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
