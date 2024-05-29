import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login";
export default forwardRef(function DropDownList({ closeDropdown }, ref) {
  const dispatch = useDispatch();
  // Hàm đăng xuất
  const logOutAction = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Can not logout");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      ref={ref}
      className="absolute right-1 top-10 bg-neutral-700 w-44 rounded shadow"
    >
      <ul className="p-4" onClick={closeDropdown}>
        <li className="text-white hover:text-[#C07F00] cursor-pointer">
          <Link to="information">Thông tin cá nhân</Link>
        </li>
        <li className="text-white hover:text-[#C07F00] cursor-pointer pb-1">
          <Link to="history">Lịch sử giao dịch</Link>
        </li>
        <li className="text-white hover:text-[#C07F00] cursor-pointer border-t pt-1">
          <Link
            to="login"
            onClick={() => {
              dispatch(loginActions.ON_LOGOUT());
              logOutAction();
            }}
          >
            Đăng xuất
          </Link>
        </li>
      </ul>
    </div>
  );
});
