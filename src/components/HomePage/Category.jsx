import { Link } from "react-router-dom";
import classes from "./Category.module.css";
export default function Category() {
  return (
    <section className={`mb-16 ${classes.category}`}>
      <div className="text-center mb-8 italic">
        <h3 className="text-gray-400 text-sm">CAREFULLY CREATED COLLECTIONS</h3>
        <h2 className="text-xl">BROWSE OUT CATEGORIES</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          {" "}
          <Link
            className="basis-1/2"
            to="shop"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
              });
            }}
          >
            {" "}
            <img src={require("../../image/product_1.png")} alt="" />
          </Link>
          <Link
            className="basis-1/2"
            to="shop"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
              });
            }}
          >
            {" "}
            <img src={require("../../image/product_2.png")} alt="" />
          </Link>
        </div>
        <div className="flex gap-6">
          {" "}
          <Link
            className="basis-1/3"
            to="shop"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
              });
            }}
          >
            {" "}
            <img src={require("../../image/product_3.png")} alt="" />
          </Link>
          <Link
            className="basis-1/3"
            to="shop"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
              });
            }}
          >
            {" "}
            <img src={require("../../image/product_4.png")} alt="" />
          </Link>
          <Link
            className="basis-1/3"
            to="shop"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
              });
            }}
          >
            {" "}
            <img src={require("../../image/product_5.png")} alt="" />
          </Link>
        </div>
      </div>
    </section>
  );
}
