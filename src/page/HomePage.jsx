import { json } from "react-router-dom";
import openSocket from "socket.io-client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "../components/HomePage/Banner";
import Category from "../components/HomePage/Category";
import Products from "../components/HomePage/Products";
import SubInfo from "../components/HomePage/SubInfo";
import { loginActions } from "../store/login.js";

export default function HomePage() {
  const socket = openSocket(`${process.env.REACT_APP_API}`, {
    withCredentials: true,
  });

  // Join room chat
  useEffect(() => {
    socket.emit("joinRoom", { roomId: "user" });
  }, []);
  const dispatch = useDispatch();

  // Hàm check auth được gọi mỗi khi reload page
  useEffect(() => {
    // Hàm check auth
    const checkAuth = async () => {
      try {
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
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []);
  return (
    <div className="max-w-4xl mx-auto">
      <Banner></Banner>
      <Category></Category>
      <Products></Products>
      <SubInfo></SubInfo>
    </div>
  );
}
