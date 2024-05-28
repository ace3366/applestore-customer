import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login.js";
import { useState } from "react";
import DropDownList from "../UI/DropDownList.jsx";
import classes from "./NavBar.module.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.login.isAuth);
  const user = useSelector((state) => state.login.user);
  const isLoading = useSelector((state) => state.login.isLoading);
  const [openDrop, setOpenDrop] = useState(false);

  return (
    <div className="nav-bar flex justify-between py-4 italic text-lg max-w-4xl mx-auto">
      <div>
        <Link to="" className="mr-2 text-[#e6c16d]">
          Home
        </Link>
        <Link to="shop" className="mx-2 hover:text-[#C07F00]">
          Shop
        </Link>
      </div>
      <Link to="" className="text-2xl">
        {" "}
        BOUTIQUE
      </Link>

      <div className="relative w-44 flex justify-end">
        {isLoading || (
          <div>
            {isAuth && (
              <Link to="cart" className={`${classes.choose} mr-3`}>
                <i className="fa-solid fa-cart-flatbed mr-1 "></i>
                Cart
              </Link>
            )}
            {/* Nếu chưa đăng nhập thì hiển thị phần login
        Nếu đăng nhập rồi hiển thị phần user */}
            {isAuth ? (
              <div
                className={`${classes.choose} cursor-pointer inline-block`}
                onClick={() => {
                  setOpenDrop((prevState) => !prevState);
                }}
              >
                <i className="fa-solid fa-user mr-1"></i>
                {isAuth && user.fullName}
              </div>
            ) : (
              <Link to="login" className={classes.choose}>
                <i className="fa-solid fa-user mr-1"></i>
                Login
              </Link>
            )}
            {openDrop && (
              <DropDownList
                closeDropdown={() => {
                  setOpenDrop((prevState) => !prevState);
                }}
              ></DropDownList>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
