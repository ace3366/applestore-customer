import { Form, useRouteLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cartActions } from "../store/listCart";
import { modalActions } from "../store/modal";

import priceConverter from "../util/priceConverter.js";

import Banner from "../components/CheckoutPage/Banner";
import Announce from "../components/CheckoutPage/Announce";
import AnnounceModal from "../components/Modal/AnnounceModal.jsx";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.openModal);

  // Lấy dữ liệu về tất cả product và price
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/get-cart`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Can not fetch cart");
        }
        const resData = await response.json();

        dispatch(
          cartActions.setTotalPrice({
            totalPrice: resData.cart.totalPrice,
            totalProduct: resData.cart.products,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, []);

  const cart = useSelector((state) => state.cart.totalProduct);
  const total = useSelector((state) => state.cart.totalPrice);
  const styles = {
    label: "italic text-lg text-neutral-500 my-3",
    input:
      "pl-4 border-neutral-300 border-2 hover:border-neutral-400 w-full h-10",
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-12 mb-16">
        <Banner></Banner>
        <h3 className="text-2xl mb-5 my-12 font italic">BILLING DETAILS</h3>
        <div className="flex gap-4">
          {/* Phần form */}
          <Form method="post" className="basis-2/3">
            <div className={styles.label} htmlFor="">
              FULL NAME :
            </div>
            <input
              className={styles.input}
              name="fullName"
              type="text"
              placeholder="Enter Your Full Name Here!"
            />
            <div className={styles.label} htmlFor="">
              EMAIL :
            </div>
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="Enter Your Email Here!"
            />
            <div className={styles.label} htmlFor="">
              PHONE NUMBER :
            </div>
            <input
              className={styles.input}
              name="phone"
              type="text"
              placeholder="Enter Your Phone Number Here!"
            />
            <div className={styles.label} htmlFor="">
              ADDRESS :
            </div>
            <input
              className={styles.input}
              name="address"
              type="text"
              placeholder="Enter Your Addess Here!"
            />
            {/* Input ẩn gửi kèm theo form */}
            <input type="hidden" name="totalProduct" value={cart} />
            <input type="hidden" name="totalPrice" value={total} />
            {/* Nút ấn gửi form */}
            <button
              onClick={() => {
                dispatch(modalActions.SHOW_POPUP());
              }}
              className="block py-2 px-6 text-lg mt-5 text-neutral-400 hover:text-neutral-300 italic"
            >
              Place order
            </button>
          </Form>

          {/* Phần total */}
          <div className="basis-1/3">
            <div className=" bg-neutral-100 px-7 ">
              <div className="italic py-12">
                <h2 className="text-xl mb-7">YOUR ORDER</h2>
                {cart.map((product) => (
                  <div
                    key={product.productId._id}
                    className="py-3 border-b-2 tracking-tight"
                  >
                    <div>{product.productId.name}</div>
                    <div className="text-neutral-400">
                      {" "}
                      {priceConverter(product.productId.price)} x{" "}
                      {product.quantity}{" "}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-6 text-lg">
                  <div className="font-medium">TOTAL</div>
                  <div className="text-neutral-700">
                    {priceConverter(total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <AnnounceModal>
          <Announce></Announce>
        </AnnounceModal>
      )}
    </>
  );
}

export async function action({ request, params }) {
  try {
    const data = await request.formData();
    const orderInfo = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      totalProduct: data.get("totalProduct"),
      totalPrice: data.get("totalPrice"),
    };
    const response = await fetch(`${process.env.REACT_APP_API}/post-order`, {
      method: "POST",
      body: JSON.stringify(orderInfo),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Can not send data");
    }
    return null;
  } catch (err) {
    console.log(err);
  }
}
