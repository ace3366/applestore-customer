import classes from "./Information.module.css";
import { useEffect, useState } from "react";
import { getData } from "../util/localStorage.js";
export default function Information() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/get-user-info`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not fetch data");
        }
        const resData = await response.json();
        console.log(resData);
        setUser(resData.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);
  return (
    <>
      <div className={classes.info}>
        <div className="py-14">
          {" "}
          <section
            className={` bg-white border max-w-xl mx-auto py-16 flex flex-col items-center rounded-2xl shadow-lg`}
          >
            <h2 className=" text-3xl italic mb-20  text-neutral-500">
              User Information{" "}
            </h2>

            {/* Phần info */}
            <div className="w-4/5 text-xl ">
              <table>
                <tr>
                  <td className="pr-12 italic">Tên :</td>
                  <td>{user.fullName}</td>
                </tr>
                <tr>
                  <td className="pr-12 italic">Email :</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td className="pr-12 italic">Số điện thoại :</td>
                  <td>{user.phone}</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
