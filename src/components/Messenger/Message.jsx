import React from "react";

export default function Message({ message }) {
  //Style
  const styles = {
    customer: "py-2 px-3 text-neutral-100 bg-sky-400 rounded",
    customerHolder: "self-end mb-6",
    admin: "py-2 px-3 text-neutral-500 bg-neutral-200 rounded",
    adminHolder: " mb-6 flex",
  };
  return (
    <>
      {message.userId && message.userId.role === "admin" ? (
        <div className={styles.adminHolder}>
          <img
            className="w-10"
            src={require("../../image/3_avatar-512.png")}
            alt=""
          />
          <span className={styles.admin}>{message.message}</span>
        </div>
      ) : (
        <div className={styles.customerHolder}>
          <span className={styles.customer}>{message.message}</span>
        </div>
      )}
      {message.end && (
        <div className="text-center text-neutral-500 italic">
          Bạn đã kết thúc phiên tư vấn
        </div>
      )}
    </>
  );
}
