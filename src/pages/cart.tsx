import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";

const cartItems = [
{
  productId:"4h4j74jh2",
  name:"Punjabi kalka design for men ",
  price:2543,
  stock:254,
  quantity:4,
  photo:"https://i.pinimg.com/originals/a6/a1/dc/a6a1dc0f04d00cdcdbc1d89a0dad623c.jpg"
}

];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + shippingCharges + tax;
const discount = 400;

const Cart = () => {
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
        {cartItems.map((i,idx) => (
          <CartItem key={idx}/>
        ))}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount : <em> - ₹{discount}</em>
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
      </aside>
    </div>
  );
};

export default Cart;
