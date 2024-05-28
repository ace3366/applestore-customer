import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal.js";
import { cartActions } from "../../store/listCart.js";
import priceConverter from "../../util/priceConverter.js";

export default function Announce() {
  const dispatch = useDispatch();
  const prodData = useSelector((state) => state.modal.modalInfo);

  return (
    <div className="text-center py-10 px-10">
      <h2 className="text-3xl mb-16 text-neutral-600">
        Đơn hàng của bạn đã được xử lý
      </h2>

      <div className="flex justify-evenly">
        <button
          className="text-xl bg-red-600 py-3 px-5 text-neutral-200 hover:bg-red-500"
          onClick={() => {
            dispatch(modalActions.HIDE_POPUP());
          }}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
