import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/cart-item";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { cartItem } from "../types/types";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: RootState) => state.cartReducer
    );

  const [cuponCode, setCuponCode] = useState<string>("");
  const [isValidcuponCode, setIsValidCuponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: cartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: cartItem) => {
    if (cartItem.quantity > 1)
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (id: string) => {
    dispatch(removeCartItem(id));
    toast.success("Cart Item Removed successfully");
  };

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${cuponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCuponCode(true);
          dispatch(calculatePrice());
        })

        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCuponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCuponCode(false);
    };
  }, [cuponCode, dispatch]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [dispatch, cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItem
              key={idx}
              cartItem={i}
              decrementHandler={decrementHandler}
              incrementHandler={incrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount : <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Enter your coupon code"
          value={cuponCode}
          onChange={(e) => setCuponCode(e.target.value)}
        />

        {cuponCode &&
          (isValidcuponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{cuponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invaild Cupon <VscError />{" "}
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
