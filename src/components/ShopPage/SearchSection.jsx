import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function SearchSection({ className }) {
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // Lấy ra từng param
  const search = searchParams.get("search");
  const styles = {
    title: "pl-5 py-2 bg-gray-100 font-medium",
    title_sm: "pl-5 py-2 bg-gray-100 font-medium text-neutral-700",
    sub: "pl-5 py-2 cursor-pointer hover:text-[#e6c16d]",
  };
  return (
    <>
      {/* Phần sm */}
      <div className={`block sm:hidden relative h-screen `}>
        <i
          className={`hover:bg-slate-700 hover:text-neutral-100 rounded-full p-3  fa-solid hidden mt-2 mb-4 fa-bars ml-4 text-4xl cursor-pointer ${
            toggleDisplay && "bg-slate-700 text-neutral-100"
          }`}
          onClick={() => {
            setToggleDisplay((prevState) => !prevState);
          }}
        ></i>

        <div
          className={`absolute rounded w-40 py-2 transition ease-in duration-200 bg-neutral-800 z-10 border-r-2 border-neutral-800 text-neutral-200 ${
            toggleDisplay
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        >
          <h4 className="bg-zinc-950 font-medium pl-5 text-white ">CATEGORY</h4>
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

          <h4 className={styles.title_sm}>IPHONE & MAC</h4>
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

          <h4 className={styles.title_sm}>WIRELESS</h4>
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

          <h4 className={styles.title_sm}>OTHER</h4>
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
      {/* Phần full screen */}
      <div className={`italic ${className} hidden sm:block`}>
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
    </>
  );
}
