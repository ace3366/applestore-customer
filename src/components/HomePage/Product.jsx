import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modal.js";
import priceConverter from "../../util/priceConverter.js";
import classes from "./Product.module.css";

export default function Product({ img, name, price, desc, id }) {
  const dispatch = useDispatch();
  const realPrice = priceConverter(price);
  function openTheModal() {
    // Khi ấn vào hình thì gọi action SHOW_POPUP
    dispatch(modalActions.SHOW_POPUP({ img, name, realPrice, desc, id }));
  }

  return (
    <>
      <div className={`${classes.product} w-52`}>
        <img
          src={img}
          alt=""
          className="cursor-pointer"
          onClick={openTheModal}
        />
        <div className="text-center mt-5 mb-2 font-medium italic">{name}</div>
        <div className="text-center italic text-gray-400">
          {/* Biến đổi number sang string rồi chèn dấu chấm bằng regular expression */}
          {realPrice}
        </div>
      </div>
    </>
  );
}
