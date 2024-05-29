import React from "react";
import classes from "./ErrorPage.module.css";
export default function ErrorPage() {
  return (
    <main className={` ${classes.main} h-screen flex justify-center`}>
      {" "}
      <div className="text-center mt-44">
        {" "}
        <h2 className="text-6xl font-encode font-semibold text-red-500">
          Oops!
        </h2>
        <p className="text-2xl mt-10">Look like something went wrong</p>
        <h3 className="text-2xl mt-10 mb-8">
          It may take some time to fetch data from the server<br></br> Please
          stand by or refresh the page
        </h3>
        <h3 className="text-xl text-red-500 font-semibold">
          We're sorry for this inconvenience
        </h3>
      </div>
    </main>
  );
}
