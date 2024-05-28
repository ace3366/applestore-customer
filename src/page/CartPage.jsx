import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setData, getData } from "../util/localStorage.js";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/listCart.js";
import priceConverter from "../util/priceConverter.js";
import Banner from "../components/CartPage/Banner";
import ProductCart from "../components/CartPage/ProductCart";
import Announce from "../components/CartPage/Announce.jsx";
import AnnounceModal from "../components/Modal/AnnounceModal.jsx";

export default function CartPage() {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalProduct = useSelector((state) => state.cart.totalProduct);
  const modal = useSelector((state) => state.modal.openModal);

  const coupon = 1;
  const styles = {
    td: "font-medium text-neutral-600 py-4 px-3",
  };

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

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 mb-12">
        <Banner></Banner>
        <h3 className="text-2xl mb-5 my-12 italic">CATEGORIES</h3>
        {/* Phần thông tin cart */}
        <div className="flex justify-between gap-8">
          {" "}
          {/* Phần products */}
          <div className="italic basis-2/3">
            {/* List sản phẩm trong Card */}
            <table className=" w-full mb-12">
              {/* Phần tiêu đề hiển thị */}
              <tr className="bg-neutral-100">
                <th className={styles.td}>IMAGE</th>
                <th className={styles.td}>PRODUCT</th>
                <th className={styles.td}>PRICE</th>
                <th className={styles.td}>QUANTITY</th>
                <th className={styles.td}>TOTAL</th>
                <th className={styles.td}>REMOVE</th>
              </tr>
              {/* Phần sản phẩm */}
              {totalProduct &&
                totalProduct.map((product) => (
                  <ProductCart
                    img={product.productId.img1}
                    name={product.productId.name}
                    price={product.productId.price}
                    key={product.productId._id}
                    id={product.productId._id}
                    quantity={product.quantity}
                    productTotalPrice={product.productTotalPrice}
                  ></ProductCart>
                ))}
            </table>

            {/* In 1 câu thông báo nếu giỏ hàng đang trống */}
            {totalProduct.length === 0 && (
              <p className="text-center mb-12 italic text-lg text-neutral-500">
                Giỏ hàng hiện đang trống
              </p>
            )}
            {/* Thanh navigate */}
            <div className="w-full bg-neutral-100">
              <div className="flex justify-between py-5 px-6">
                <Link
                  to="/shop"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                  }}
                  className="hover:text-[#c07f00] font-light text-lg py-1 cursor-pointer"
                >
                  <i className="fa-solid fa-left-long mr-2"></i>Continue
                  shopping
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                  }}
                  className="hover:text-[#c07f00] hover:border-[#c07f00] font-light text-lg py-1 px-3 cursor-pointer border-2 border-neutral-900 "
                >
                  Proceed to checkout
                  <i className="fa-solid fa-right-long ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
          {/* Phần total */}
          <div className="basis-1/3 italic">
            <div className="py-16 px-8 bg-neutral-100">
              <h2 className="text-xl my-5 font-medium">CART TOTAL</h2>
              <div className="flex justify-between pb-3 border-b-2">
                <div>SUBTOTAL</div>
                <div className="text-neutral-500" className="text-neutral-400">
                  {priceConverter(totalPrice)}
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div>TOTAL</div>
                <div>{priceConverter(totalPrice * coupon)}</div>
              </div>
              <div className="mt-7">
                <input
                  className="h-10 w-full pl-3 hover:border-2"
                  type="text"
                  placeholder="Enter your coupon"
                />
                <button className="w-full text-neutral-200 py-2 hover:bg-neutral-600">
                  <i className="fa-solid fa-gift"></i> Apply coupon
                </button>
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
