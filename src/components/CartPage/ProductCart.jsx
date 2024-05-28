import { useRouteLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { modalActions } from "../../store/modal";
import { cartActions } from "../../store/listCart.js";
import { getData, setData } from "../../util/localStorage.js";
import priceConverter from "../../util/priceConverter.js";
export default function ProductCart({
  name,
  img,
  price,
  id,
  quantity,
  productTotalPrice,
}) {
  // Lọc lấy product cần thiết
  // console.log(allProduct);

  // Khai báo redux
  const dispatch = useDispatch();

  // State
  const [prodQuantity, setProdQuantity] = useState(quantity);
  // Hàm xử lý tăng hay giảm số lượng
  const quantityManipulate = async (action) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/${action}/${id}`,
        {
          method: "POST",
          body: JSON.stringify({ quantity: 1 }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Can not adjust data");
      }
      if (action === "add-to-cart") {
        setProdQuantity((prevState) => prevState + 1);
      } else {
        setProdQuantity((prevState) => prevState - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {id && (
        <tr className="text-center">
          <td className="py-5 px-2 w-2/12">
            <img src={img} className="" alt="" />
          </td>
          <td className="px-2 w-3/12 font-medium">{name}</td>
          <td className="px-2 w-2/12 text-sm text-neutral-400">
            {priceConverter(price)}
          </td>
          <td className="px-2 w-2/12">
            <i
              className="fa-solid fa-caret-left w-5 text-center my-auto cursor-pointer"
              onClick={() => {
                if (prodQuantity > 1) {
                  quantityManipulate("subtract-from-cart");
                  dispatch(cartActions.decrease(price));
                }
              }}
            ></i>
            <span className="not-italic">{prodQuantity}</span>{" "}
            <i
              className="fa-solid fa-caret-right w-5 text-center my-auto cursor-pointer"
              onClick={() => {
                quantityManipulate("add-to-cart");
                dispatch(cartActions.increase(price));
              }}
            ></i>
          </td>
          <td className="px-2 w-2/12 text-sm text-neutral-400">
            {priceConverter(price * prodQuantity)}
          </td>
          <td className="px-2 w-1/12 text-neutral-600">
            <i
              className="fa-regular fa-trash-can cursor-pointer hover:text-rose-600"
              onClick={() => {
                dispatch(
                  modalActions.SHOW_POPUP({
                    name,
                    img,
                    quantity: prodQuantity,
                    price,
                    id,
                  })
                );
                // dispatch(cartActions.DELETE_CART({ id }));
              }}
            ></i>
          </td>
        </tr>
      )}
    </>
  );
}
