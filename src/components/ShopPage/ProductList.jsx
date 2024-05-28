import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Product from "./Product";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const [searchBar, setSearchBar] = useState("");

  // Lấy dữ liệu product
  const data = useRouteLoaderData("product-sample").products;

  // Khởi tạo list với full product, sau đó lọc theo query parameter
  const filteredCategory =
    !searchValue || searchValue === ("all" || "")
      ? data
      : data.filter((product) => product.category === searchValue);

  // Lọc theo phần user search, loại bỏ case sensitivity
  const filteredProduct = filteredCategory.filter((product) =>
    product.name.toLowerCase().includes(searchBar.toLowerCase())
  );
  return (
    <div className="basis-3/4">
      <form action="" className="h-8 flex justify-between mb-7">
        <input
          type="text"
          onChange={(e) => {
            setSearchBar(e.target.value);
          }}
          className="p-3 w-48 border-gray-200 hover:border-gray-400 border-solid border-2"
          placeholder="Enter Search Here!"
        />
        <select
          name=""
          id=""
          className="border-solid border-gray-400 text-sm border-2"
        >
          <option value="">Default sorting</option>
        </select>
      </form>
      {/* Phần sản phẩm hiển thị sau khi lọc */}
      <div className="flex flex-wrap gap-9">
        {filteredProduct.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            img={product.img1}
            name={product.name}
            price={product.price}
          ></Product>
        ))}
      </div>
    </div>
  );
}
