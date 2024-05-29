import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { messModalActions } from "../../store/messengerModal.js";
import { loginActions } from "../../store/login.js";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MessengerModal from "../Messenger/MessengerModal.jsx";

export default function Layout() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.messenger.openModal);
  const isAuth = useSelector((state) => state.login.isAuth);
  // Hàm check auth được gọi mỗi khi reload page
  useEffect(() => {
    // Hàm check auth
    const checkAuth = async () => {
      try {
        dispatch(loginActions.ISLOADING());
        const response = await fetch(
          `${process.env.REACT_APP_API}/check-auth`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not get auth");
        }
        const resData = await response.json();

        if (resData.isAuth) {
          dispatch(loginActions.ON_LOGIN(resData));
        } else {
          dispatch(loginActions.ON_LOGOUT());
        }
        dispatch(loginActions.ISLOADING());
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []);
  // Nếu click ra ngoài thì đóng modal mess lại
  const targetRef = useRef();
  const fromtargetRef = useRef();
  const handleClickOutside = (event) => {
    if (
      targetRef.current &&
      !targetRef.current.contains(event.target) &&
      fromtargetRef.current &&
      !fromtargetRef.current.contains(event.target)
    ) {
      dispatch(messModalActions.TOGGLE_POPUP());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      {isAuth && (
        <div
          ref={fromtargetRef}
          className="text-gradient bg-gradient-to-bl text-5xl fixed right-10 bottom-20 z-20 cursor-pointer"
        >
          <i
            onClick={() => {
              dispatch(messModalActions.TOGGLE_POPUP());
            }}
            className="fa-brands fa-facebook-messenger text-5xl"
          ></i>
        </div>
      )}

      <Outlet></Outlet>
      <Footer></Footer>
      {modal && <MessengerModal ref={targetRef}></MessengerModal>}
    </div>
  );
}
