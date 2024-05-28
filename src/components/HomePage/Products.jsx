import { useRouteLoaderData } from "react-router-dom";
import Product from "./Product";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";

export default function Products() {
  const modal = useSelector((state) => state.modal.openModal);

  const data = useRouteLoaderData("product-sample");

  const productData = data && data.products.slice(0, 8);
  return (
    <>
      <section className="mb-12">
        <div className=" mb-8 italic">
          <h3 className="text-gray-400 text-sm">MAKE THE HARD WAY</h3>
          <h2 className="text-xl">TOP TRENDING PRODUCTS</h2>
        </div>
        <div className="flex flex-wrap gap-5">
          {productData.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              desc={product.short_desc}
              img={product.img1}
              name={product.name}
              price={product.price}
            ></Product>
          ))}
        </div>
      </section>
      {/* Nếu modal đã được set thành true thì lấy ra để hiện modal */}
      {modal && <Modal></Modal>}
    </>
  );
}
