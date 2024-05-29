import { useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Product from "./Product";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";

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
        <div className="flex flex-wrap gap-5">
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
            <div className="flex flex-col items-center text-center mx-auto">
              <h3 className="text-2xl mt-10 mb-8 font-medium">
                It may take some time to fetch data from the server<br></br>{" "}
                Please stand by or refresh the page
              </h3>
              <div className="animate-spin h-10 w-10 border-4 rounded-full border-t-blue-500"></div>
              <h3 className="text-xl text-red-500 font-semibold mt-7">
                We're sorry for this inconvenience
              </h3>
            </div>
          )}
        </div>
      </section>
      {/* Nếu modal đã được set thành true thì lấy ra để hiện modal */}
      {modal && <Modal></Modal>}
    </>
  );
}
