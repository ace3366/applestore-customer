import { Link, Form, redirect, useActionData } from "react-router-dom";
import classes from "./LoginPage.module.css";

export default function LoginPage() {
  const validations = useActionData();
  return (
    <>
      <div className={classes.login}>
        <div className="py-14">
          {" "}
          <section
            className={` bg-white border max-w-xl mx-auto py-16 flex flex-col items-center rounded-2xl shadow-lg`}
          >
            <h2 className=" text-3xl italic mb-20  text-neutral-500">
              Sign In{" "}
            </h2>

            {/* Hiển thị báo lỗi validate */}
            <div className="mb-6 pl-16 italic w-full text-rose-400">
              {validations && validations.error && (
                <p>{validations.error[0].msg}</p>
              )}
            </div>

            {/* Phần form */}
            <Form action="" method="post" className="flex flex-col w-4/5">
              <input
                type="email"
                name="email"
                className={`
                 border-2 hover:border-neutral-400 h-16 pl-7 `}
                placeholder="Email"
              />

              <input
                type="password"
                name="password"
                className={` border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7`}
                placeholder="Password"
              />

              <button className="w-full py-5 text-neutral-200 mt-6">
                SIGN IN
              </button>
            </Form>

            {/* Phần toggle signup/in */}
            <div className="mt-10 italic text-lg">
              <span className="text-neutral-500">Create an account?</span>

              <Link to="/register" className="cursor-pointer ml-2 text-sky-700">
                Sign up
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// Hàm action xử lý khi có form submit
export async function action({ request, params }) {
  try {
    const data = await request.formData();
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const response = await fetch(`${process.env.REACT_APP_API}/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    // Return validation errors
    if (!response.ok) {
      return response;
    }
    return redirect("/");
  } catch (err) {
    console.log(err);
    return {
      error: [
        {
          msg: "Something went wrong with the server. Maybe the server is starting up right now",
        },
      ],
    };
  }
}
