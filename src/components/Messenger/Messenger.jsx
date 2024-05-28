import openSocket from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import Message from "./Message";

// Khởi tạo socket
const socket = openSocket(`${process.env.REACT_APP_API}`, {
  withCredentials: true,
});

export default function Messenger() {
  // Khởi tạo State
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Create a ref for the chat container
  const chatContainerRef = useRef(null);
  // Scroll to the bottom of the chat container whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Nhận incomming message
  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((messages) => [...messages, message]);
    };

    socket.on("message", handleMessage);

    // Clean up the listener on component unmount
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  // Lấy tin nhắn từ DB
  useEffect(() => {
    socket.emit("joinRoom", { roomId: "user" });

    // Hàm render tin nhắn từ DB
    const renderMessage = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/get-messages`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not fetch message");
        }
        const resData = await response.json();
        setMessages(resData);
      } catch (err) {
        console.log(err);
      }
    };
    renderMessage();
  }, []);

  // Hàm gửi tin nhắnh bằng Socket.IO
  const sendingMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      message,
    });
    setMessage("");
  };

  // Render
  return (
    <div className="flex flex-col justify-between">
      {/* Logo */}
      <div className="flex justify-between p-3 border-b-2 border-neutral-100">
        <h3 className="text-lg font-bold">Customer Support</h3>
        <div className="py-1 px-2 text-neutral-400 text-sm rounded-sm italic bg-neutral-200">
          Let's Chat App
        </div>
      </div>
      {/* Khung chat */}
      <div
        className="flex flex-col p-4 h-[25rem] overflow-scroll"
        ref={chatContainerRef}
      >
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
      {/* Phần chat */}
      <div className="h-12 border-2 bg-neutral-100">
        <form
          onSubmit={(e) => {
            sendingMessage(e);
          }}
          className="py-2 pl-5 flex"
        >
          <img
            className="w-8 mr-3 inline-block"
            src={require("../../image/3_avatar-512.png")}
            alt=""
          />
          <input
            className="w-64 focus:outline-none pl-1"
            type="text"
            value={message}
            placeholder="Enter Message!"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div>
            {" "}
            <label className="cursor-pointer ml-2" htmlFor="file-input">
              <i className="fa-solid fa-paperclip text-neutral-400 hover:text-neutral-500 text-xl"></i>
            </label>
            <input className="hidden" id="file-input" type="file" />
            <i className="fa-solid fa-face-smile cursor-pointer text-xl ml-4 text-neutral-400 hover:text-neutral-500 inline-block"></i>
            <button className="bg-transparent">
              {" "}
              <i className="fa-solid fa-paper-plane text-sky-400 text-xl ml-4 hover:text-sky-500"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
