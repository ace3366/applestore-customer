import React, { useEffect, useState } from "react";
import Banner from "../components/History/Banner";
import OrderList from "../components/History/OrderList";
export default function History() {
  const styles = {
    td: "font-medium text-neutral-600 py-4 px-3",
  };
  const [orders, setOrders] = useState([]);

  // Fetch data from server
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/get-orders`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not fetch order");
        }
        const resData = await response.json();
        setOrders(resData.orders);
        console.log("huh");
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 mb-12 ">
        <Banner></Banner>
      </div>
      <div className="max-w-6xl mx-auto h-screen">
        {/* Phần thông tin order */}
        <div className="italic">
          {/* List sản phẩm trong Card */}
          <table className=" w-full mb-12">
            {/* Phần tiêu đề hiển thị */}
            <tr className="bg-neutral-100">
              <th className={styles.td}>ID ORDER</th>
              <th className={styles.td}>ID USER</th>
              <th className={styles.td}>NAME</th>
              <th className={styles.td}>PHONE</th>
              <th className={styles.td}>ADDRESS</th>
              <th className={styles.td}>TOTAL</th>
              <th className={styles.td}>DELIVERY</th>
              <th className={styles.td}>STATUS</th>
              <th className={styles.td}>DETAIL</th>
            </tr>
            {/* Phần order table */}
            {orders.map((order) => (
              <OrderList
                id={order._id}
                userId={order.userId}
                fullName={order.fullName}
                phone={order.phone}
                address={order.address}
                totalPrice={order.cart.totalPrice}
              ></OrderList>
            ))}
          </table>

          {/* In 1 câu thông báo nếu giỏ hàng đang trống */}
          {/* {totalProduct.length === 0 && (
          <p className="text-center mb-12 italic text-lg text-neutral-500">
            Giỏ hàng hiện đang trống
          </p>
        )} */}
        </div>
      </div>
    </>
  );
}
