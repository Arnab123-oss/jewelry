import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";


const Cart = () => {
  const {cartItems,subtotal,tax,total,shippingCharges,discount} = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );

  const [cuponCode, setCuponCode] = useState<string>("");
  const [isValidcuponCode, setIsValidCuponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCuponCode(true);
      else setIsValidCuponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      setIsValidCuponCode(false);
    };
  }, []);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => <CartItem key={idx} cartItem={i} />)
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
