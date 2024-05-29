import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login.js";
import { useState, useRef, useEffect } from "react";
import DropDownList from "../UI/DropDownList.jsx";
import classes from "./NavBar.module.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.login.isAuth);
  const user = useSelector((state) => state.login.user);
  const isLoading = useSelector((state) => state.login.isLoading);
  const [openDrop, setOpenDrop] = useState(false);

  // Nếu click ra ngoài thì đóng dropdown lại
  const dropdownRef = useRef();
  const userinfoRef = useRef();
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      userinfoRef.current &&
      !userinfoRef.current.contains(event.target)
    ) {
      setOpenDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-bar flex justify-between py-4 italic text-lg max-w-4xl lg:px-0 px-3  mx-auto">
      <div>
        <Link to="" className="mr-2 text-[#e6c16d]">
          Home
        </Link>
        <Link to="shop" className="mx-2 hover:text-[#C07F00]">
          Shop
        </Link>
      </div>
      <Link to="" className="text-2xl hidden mp:inline">
        {" "}
        BOUTIQUE
      </Link>

      <div className="relative">
        {isLoading || (
          <div>
            {isAuth && (
              <Link to="cart" className={`${classes.choose} mr-3`}>
                <i className="fa-solid fa-cart-flatbed mr-1 "></i>
                <span className="sp:inline hidden">Cart</span>
              </Link>
            )}
            {/* Nếu chưa đăng nhập thì hiển thị phần login
        Nếu đăng nhập rồi hiển thị phần user */}
            {isAuth ? (
              <div
                ref={userinfoRef}
                className={`${classes.choose} cursor-pointer inline-block`}
                onClick={() => {
                  setOpenDrop((prevState) => !prevState);
                }}
              >
                <i className="fa-solid fa-user mr-1"></i>
                <span className="hidden mp:inline">
                  {isAuth && user.fullName}
                </span>
              </div>
            ) : (
              <Link to="login" className={classes.choose}>
                <i className="fa-solid fa-user mr-1"></i>
                Login
              </Link>
            )}
            {openDrop && (
              <DropDownList
                ref={dropdownRef}
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
