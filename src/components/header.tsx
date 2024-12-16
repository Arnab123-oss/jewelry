import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {

  const { cartItems} =
  useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );


  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Log out successfully")
      setIsOpen(false);
    } catch {
      toast.error("Failed to log out")
    }
  };

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        Home
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
       
        <FaShoppingBag />
        <p style={{
    position: "absolute",
    top: "12px",
    right: "45px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "1px 4px",
    fontSize: "10px",
    // fontWeight: "bold",
  }}>{cartItems?cartItems.length:0}</p>
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to={"/admin/dashboard"}>
                  Admin
                </Link>
              )}
            </div>

            <Link onClick={() => setIsOpen(false)} to={"/orders"}>
              Orders
            </Link>

            <button onClick={logoutHandler}>
              <FaSignOutAlt />
            </button>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
