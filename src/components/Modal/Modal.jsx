import classes from "./Modal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal.js";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

// Kiểm tra xe có div chứa modal chưa, tạo 1 cái nếu chưa có
let modalRoot = document.getElementById("modal-root");

if (!modalRoot) {
  const newModal = document.createElement("div");
  newModal.id = "modal-root";
  document.body.appendChild(newModal);
  modalRoot = newModal;
}

export default function Modal() {
  const modalInfo = useSelector((state) => state.modal.modalInfo);

  const dispatch = useDispatch();
  return createPortal(
    <div className={classes.modal}>
      <div className={classes["modal-backdrop"]}></div>
      <div className={classes["modal-content"]}>
        {/* Ấn nút để hide pop up */}
        <div
          className={`${classes["close-modal"]} cursor-pointer`}
          onClick={() => {
            dispatch(modalActions.HIDE_POPUP());
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        {/* Phần content */}
        <div className="md:flex ">
          <div className="md:basis-6/12 flex items-center">
            {" "}
            <img className="" src={modalInfo.img} alt="" />
          </div>
          <div className="md:basis-6/12 pt-16 pl-6 pr-16 italic">
            <h2 className="text-3xl">{modalInfo.name}</h2>
            <div className="text-neutral-500 text-2xl py-2">
              {modalInfo.realPrice}
            </div>
            <p className="text-neutral-400 mb-7">{modalInfo.desc}</p>
            <Link
              to={`/detail/${modalInfo.id}`}
              onClick={() => {
                window.scroll({
                  top: 0,
                  left: 0,
                });
                dispatch(modalActions.HIDE_POPUP());
              }}
            >
              <button className="py-2 px-8 text-sm bg-[#383838] text-neutral-300">
                <i className="fa-solid fa-cart-shopping mr-2"></i>
                View Detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
