// import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
// import { categoryAction } from "../../store/category.js";

export default function SearchSection({ className }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // Lấy ra từng param
  const search = searchParams.get("search");
  const styles = {
    title: "pl-5 py-2 bg-gray-100 font-medium",
    sub: "pl-5 py-2 cursor-pointer hover:text-[#e6c16d]",
  };
  return (
    <div className={`italic ${className}`}>
      <h3 className="text-2xl mb-5 font-medium">CATEGORIES</h3>
      <div className="">
        <h4 className="bg-zinc-950 font-medium pl-5 text-white ">APPLE</h4>
        <div
          className={`${styles.sub} ${
            search === "all" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            // dispatch(categoryAction.CHOOSE_CATE("all"));
            setSearchParams({ search: "all" });
          }}
        >
          All
        </div>

        <h4 className={styles.title}>IPHONE & MAC</h4>
        <div
          className={`${styles.sub} ${
            search === "iphone" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            setSearchParams({ search: "iphone" });
          }}
        >
          IPhone
        </div>
        <div
          className={`${styles.sub} ${
            search === "ipad" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            setSearchParams({ search: "ipad" });
          }}
        >
          IPad
        </div>
        <div
          className={`${styles.sub} ${
            search === "macbook" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            setSearchParams({ search: "macbook" });
          }}
        >
          Macbook
        </div>

        <h4 className={styles.title}>WIRELESS</h4>
        <div
          className={`${styles.sub} ${
            search === "airpod" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            setSearchParams({ search: "airpod" });
          }}
        >
          Airpod
        </div>
        <div
          className={`${styles.sub} ${
            search === "watch" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            setSearchParams({ search: "watch" });
          }}
        >
          Watch
        </div>

        <h4 className={styles.title}>OTHER</h4>
        <div
          className={`${styles.sub} ${
            search === "mouse" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            setSearchParams({ search: "mouse" });
          }}
        >
          Mouse
        </div>
        <div
          className={`${styles.sub} ${
            search === "keyboard" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            setSearchParams({ search: "keyboard" });
          }}
        >
          Keyboard
        </div>
        <div
          className={`${styles.sub} ${
            search === "other" ? "text-[#e6c16d]" : "text-neutral -500"
          }`}
          onClick={() => {
            setSearchParams({ search: "other" });
          }}
        >
          Other
        </div>
      </div>
    </div>
  );
}
