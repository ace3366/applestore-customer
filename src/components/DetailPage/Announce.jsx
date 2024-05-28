import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal.js";
import priceConverter from "../../util/priceConverter.js";

export default function Announce() {
  const dispatch = useDispatch();
  const prodData = useSelector((state) => state.modal.modalInfo);

  return (
    <div className="text-center py-10 px-10">
      <h2 className="text-3xl mb-16 text-neutral-600">
        Sản phẩm đã được thêm vào giỏ hàng
      </h2>
      {/* Thông sản phẩm vừa add */}
      <div className="flex justify-between mb-5 gap-6">
        <div className="basis-1/3">
          <img src={prodData.img} alt="" />
        </div>
        <div className="basis-2/3 text-lg text-left">
          <div>
            Tên sản phẩm :
            <span className="ml-1 text-neutral-500">{prodData.name}</span>
          </div>
          <div>
            Giá :
            <span className="ml-1 text-neutral-500">
              {priceConverter(prodData.price)}
            </span>{" "}
          </div>
          <div>
            Số lượng :{" "}
            <span className="ml-1 text-neutral-500">{prodData.quantity}</span>{" "}
          </div>
        </div>
      </div>
      <button
        className="text-xl py-3 px-5 text-neutral-400 hover:text-neutral-50"
        onClick={() => {
          dispatch(modalActions.HIDE_POPUP());
        }}
      >
        Đóng
      </button>
    </div>
  );
}
