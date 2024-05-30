import { useParams, useRouteLoaderData, Form } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/listCart.js";
import { modalActions } from "../../store/modal.js";
import priceConverter from "../../util/priceConverter.js";
import Product from "../../components/ShopPage/Product.jsx";
import { getData, setData } from "../../util/localStorage.js";
import AnnounceModal from "../../components/Modal/AnnounceModal.jsx";
import Announce from "../../components/DetailPage/Announce.jsx";

// localStorage.clear();
export default function DetailPage() {
  const cart = getData("cart") || [];
  // Khai báo redux
  const selector = useSelector((state) => state.cart.products);
  const modal = useSelector((state) => state.modal.openModal);
  const dispatch = useDispatch();
  // Khai báo state
  const [product, setProduct] = useState({});
  const [notEnough, setNotEnough] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [image, setImage] = useState(product.img1);
  const [quantity, setQuantity] = useState(1);
  const showQuantity = useRef();
  // Khai báo params
  const param = useParams();
  //Fetch dữ liệu tất cả sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/get-product/${param.productId}`,
          { method: "GET", credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Can not fetch data");
        }
        const resData = await response.json();
        setProduct(resData.product);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [param]);

  //Fetch dữ liệu sản phẩm liên quan
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (product.category) {
          const response = await fetch(
            `${process.env.REACT_APP_API}/get-related-product/${product.category}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Can not fetch data");
          }
          const resData = await response.json();
          setRelatedProduct(resData.relatedProducts);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [product.category]);

  // Nếu có thay đổi khi click sản phẩm thì set State để re-render lại hình
  // Cũng như set quantity về 1
  useEffect(() => {
    setNotEnough(false);
    setImage(product.img1);
    setQuantity(1);
  }, [product]);

  // Hàm thêm sản phẩm vào cart
  useEffect(() => {
    setNotEnough(false);
  }, []);
  const addToCart = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `${process.env.REACT_APP_API}/add-to-cart/${param.productId}`,
        {
          method: "POST",
          body: JSON.stringify({ quantity }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        setNotEnough(true);
      } else {
        dispatch(
          modalActions.SHOW_POPUP({
            name: product.name,
            img: product.img1,
            quantity,
            price: product.price,
          })
        );
        setNotEnough(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Hàm xử lý input quantity
  function changeValue(e) {
    setQuantity(parseInt(e.target.value));
  }

  return (
    <>
      <div className="max-w-4xl mx-8 lg:mx-auto my-32">
        {/* Phần thông tin chung */}
        <section className="flex flex-col md:flex-row justify-between gap-6">
          <div className="md:basis-1/2 flex gap-2">
            {/* Khu vực chọn hình */}
            <div className="basis-1/5">
              <img
                src={product.img1}
                alt=""
                onClick={() => {
                  setImage(product.img1);
                }}
                className="cursor-pointer mb-2"
              />
              <img
                src={product.img2}
                alt=""
                onClick={() => {
                  setImage(product.img2);
                }}
                className="cursor-pointer mb-2"
              />
              <img
                src={product.img3}
                alt=""
                onClick={() => {
                  setImage(product.img3);
                }}
                className="cursor-pointer mb-2"
              />
              <img
                src={product.img4}
                alt=""
                onClick={() => {
                  setImage(product.img4);
                }}
                className="cursor-pointer mb-2"
              />
            </div>
            {/* Khu vực show hình theo hình đã chọn */}
            <div className="basis-4/5">
              {" "}
              <img src={image} alt="" />
            </div>
          </div>

          {/* Khu vực hiển thị thông tin và add to cart */}
          <div className="md:basis-1/2  italic">
            <h2 className="text-3xl">{product.name}</h2>
            <div className="my-7 text-2xl text-neutral-500 font-light">
              {priceConverter(product.price)}
            </div>
            <p className="text-neutral-400">{product.short_desc}</p>
            <div className="mt-8 mb-5">
              <span>CATEGORY : </span>
              <span className="text-neutral-400">{product.category}</span>
            </div>
            <div className="mt-8 mb-5">
              <span>AVAILABLE : </span>
              <span className="text-neutral-400">{product.count}</span>
            </div>

            {/* Xử lý phần nhập số lượng, nếu số lượng < 1 thì không giảm số nữa */}
            <form action="" onSubmit={addToCart}>
              <div className="flex">
                <div className="border-2 border-solid border-neutral-300 flex">
                  {" "}
                  <div className="mp:w-40 w-24  my-auto pl-3 text-neutral-400">
                    QUANTITY
                  </div>
                  <i
                    className="fa-solid fa-caret-left w-5 text-center my-auto cursor-pointer"
                    onClick={() => {
                      parseInt(showQuantity.current.value) > 1 &&
                        setQuantity(parseInt(showQuantity.current.value) - 1);
                    }}
                  ></i>
                  <input
                    ref={showQuantity}
                    name="quantity"
                    value={quantity}
                    onChange={changeValue}
                    type="number"
                    className="w-7 text-center"
                  />
                  <i
                    className="fa-solid fa-caret-right w-5 text-center my-auto cursor-pointer"
                    onClick={() => {
                      setQuantity(parseInt(showQuantity.current.value) + 1);
                    }}
                  ></i>
                </div>

                <button
                  onClick={addToCart}
                  className=" text-neutral-300 italic font-thin py-2 px-4"
                >
                  Add to cart
                </button>
              </div>
            </form>
            <p className="text-red-500">
              {notEnough ? "Not enough quantity" : ""}
            </p>
          </div>
        </section>

        {/* Phần mô tả */}
        <section className="mt-4">
          <button className=" text-neutral-300 py-3 px-5 italic">
            DESCRIPTION
          </button>
          <h2 className="my-8 text-2xl italic">PRODUCT DESCRIPTION</h2>
          <p className="whitespace-pre-line italic text-neutral-400">
            {product.long_desc}
          </p>
        </section>

        {/* Phần related product */}
        <section>
          <h2 className="my-8 text-2xl italic">RELATED PRODUCTS</h2>
          <div className="flex flex-wrap gap-4">
            {relatedProduct.map((product) => (
              <Product
                key={product._id}
                id={product._id}
                name={product.name}
                img={product.img1}
                price={product.price}
              ></Product>
            ))}
          </div>
        </section>
      </div>

      {/* Phần show modal thông báo khi add to cart */}
      {modal && (
        <AnnounceModal>
          <Announce></Announce>
        </AnnounceModal>
      )}
    </>
  );
}

// export async function action({ request, params }) {
//   const data = await request.formData();
//   // Chia data làm số lượng product và id product
//   const cart = {
//     quantity: parseInt(data.get("quantity")),
//     id: params.productId,
//   };
//   const cartArr = getData("cart") || [];
//   // Tìm index product
//   console.log(cartArr);
//   const index = cartArr.findIndex((product) => product.id === cart.id);
//   // Nếu không kiếm được index thì thêm product vào arr
//   if (index === -1) {
//     cartArr.push(cart);
//   } else {
//     cartArr[index].quantity += cart.quantity;
//   }
//   setData("cart", cartArr);
//   return null;
// }
