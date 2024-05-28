import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal.js";
import { cartActions } from "../../store/listCart.js";
import priceConverter from "../../util/priceConverter.js";

export default function Announce() {
  const dispatch = useDispatch();
  const prodData = useSelector((state) => state.modal.modalInfo);

  // Hàm xoá sản phẩm
  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/delete-product-from-cart/${prodData.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Can not delete data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-center py-10 px-10">
      <h2 className="text-3xl mb-16 text-neutral-600">
        Bạn có muốn xoá sản phẩm khỏi giỏ hàng ?
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
      <div className="flex justify-evenly">
        <button
          className="text-xl bg-green-600 py-3 px-5 text-neutral-200 hover:bg-green-500"
          onClick={() => {
            deleteProduct();
            dispatch(
              cartActions.delete({
                id: prodData.id,
                productTotalPrice: prodData.price * prodData.quantity,
              })
            );
            dispatch(modalActions.HIDE_POPUP());
          }}
        >
          Đồng ý
        </button>
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
