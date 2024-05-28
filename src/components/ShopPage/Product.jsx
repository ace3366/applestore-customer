import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import priceConverter from "../../util/priceConverter.js";

export default function Product({ img, name, price, id }) {
  const [navigate, setNavigate] = useState(true);
  // Chuyển đổi giá sang dạng hiển thị
  const realPrice = priceConverter(price);
  return (
    <div className={`${classes.product} w-48`}>
      <Link
        to={`/detail/${id}`}
        onClick={() => {
          window.scroll({
            top: 0,
            left: 0,
          });
        }}
      >
        {" "}
        <img src={img} alt="" className="cursor-pointer" />
        <div className="text-center mt-5 mb-2 font-medium italic">{name}</div>
      </Link>

      <div className="text-center italic text-gray-400">{realPrice}</div>
    </div>
  );
}
