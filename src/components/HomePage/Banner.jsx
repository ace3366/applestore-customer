import classes from "./Banner.module.css";
import bannerImage from "../../image/banner1.jpg";
import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <div className={`mt-3 mb-12 ${classes.banner}`}>
      <div className="italic relative top-32 left-12 w-2/5">
        <h3 className=" text-gray-400 mb-2">NEW INSPIRATION 2020</h3>
        <h2 className="text-4xl">20% OFF ON NEW SEASON</h2>
        <button className="px-6 py-2 mt-6 text-xl text-neutral-400 italic">
          <Link
            to="shop"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
              });
            }}
          >
            Browse collections
          </Link>
        </button>
      </div>
    </div>
  );
}
