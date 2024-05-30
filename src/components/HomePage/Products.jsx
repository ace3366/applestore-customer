import { useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Product from "./Product";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import InitalAnnouce from "../Announce/IninitalAnnounce.jsx";
export default function Products() {
  const modal = useSelector((state) => state.modal.openModal);
  const [data, setData] = useState(null);
  // Fetch data product từ server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/get-products`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not fetch data");
        } else {
          const resData = await response.json();
          console.log(resData);
          setData(resData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const productData = data && data.products.slice(0, 8);
  return (
    <>
      <section className="mb-12 px-3 lg:px-0">
        <div className=" mb-8 italic">
          <h3 className="text-gray-400 text-sm">MAKE THE HARD WAY</h3>
          <h2 className="text-xl">TOP TRENDING PRODUCTS</h2>
        </div>
        <div className="flex flex-wrap gap-5 justify-center sm:justify-normal">
          {productData ? (
            productData.map((product) => (
              <Product
                key={product._id}
                id={product._id}
                desc={product.short_desc}
                img={product.img1}
                name={product.name}
                price={product.price}
              ></Product>
            ))
          ) : (
            <InitalAnnouce></InitalAnnouce>
          )}
        </div>
      </section>
      {/* Nếu modal đã được set thành true thì lấy ra để hiện modal */}
      {modal && <Modal></Modal>}
    </>
  );
}
