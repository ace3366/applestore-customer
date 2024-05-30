import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebound";
import Product from "./Product";

export default function ProductList() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const debouncedKeyword = useDebounce(keyword, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search");

  //Function that Send request to server
  const sendToServer = async (keyword) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/get-products?query=${keyword}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Can not fetch data");
      const result = await response.json();
      setProducts(result.products);
    } catch (err) {
      console.log(err);
    }
  };
  // Fetch product base on category
  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/get-products-category/${searchValue}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Can not fetch data");
      const result = await response.json();
      setProducts(result.products);
    } catch (err) {
      console.log(err);
    }
  };
  // Fetch all products
  const fetchAllData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/get-products`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Can not fetch data");
      } else {
        const resData = await response.json();
        console.log(resData);
        setProducts(resData.products);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Khởi tạo list với full product, sau đó lọc theo query parameter
  useEffect(() => {
    if (searchValue === "all") {
      fetchAllData();
    } else {
      fetchCategory();
    }
  }, [searchValue]);
  //When ever useDebounce return a value, send it to server
  useEffect(() => {
    sendToServer(debouncedKeyword);
  }, [debouncedKeyword]);

  return (
    <div className="basis-3/4">
      <form action="" className="h-8 flex justify-between mb-7">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
        {products &&
          products.map((product) => (
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
