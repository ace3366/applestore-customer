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
        <p className="text-2xl mt-10">
          Look like something went wrong, we're sorry about that
        </p>
      </div>
    </main>
  );
}
