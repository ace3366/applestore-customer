import { Link, Form, redirect, useActionData } from "react-router-dom";
import classes from "./LoginPage.module.css";

export default function RegisterPage() {
  const validations = useActionData();

  // Hàm check lỗi của từng loại input
  const errorDisplay = (inputType) => {
    const haveError =
      validations &&
      validations.error &&
      validations.error.find((validate) => validate.path === inputType);
    if (haveError) {
      return haveError.msg;
    }
  };
  return (
    <>
      <div className={classes.login}>
        <div className="py-14">
          {" "}
          <section
            className={` bg-white border max-w-xl mx-auto py-16 flex flex-col items-center rounded-2xl shadow-lg`}
          >
            <h2 className=" text-3xl italic mb-10  text-neutral-500">
              Sign up
            </h2>

            {/* Phần form */}
            <Form action="" method="post" className="flex flex-col w-4/5">
              <div className="relative">
                <p className="absolute pl-7 pt-1 text-xs text-red-500">
                  {errorDisplay("fullName")}
                </p>
                <input
                  type="text"
                  name="fullName"
                  className={`${
                    errorDisplay("fullName") && "transition ease-in bg-red-200"
                  } border-2 hover:border-neutral-400 h-16 pl-7 w-full`}
                  placeholder="Full Name"
                />
              </div>

              <div className="relative">
                <p className="absolute pl-7 pt-1 text-xs text-red-500">
                  {errorDisplay("email")}
                </p>
                <input
                  type="text"
                  name="email"
                  className={`${
                    errorDisplay("email") && "transition ease-in bg-red-200"
                  } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7 w-full`}
                  placeholder="Email"
                />
              </div>

              <div className="relative">
                <p className="absolute pl-7 pt-1 text-xs text-red-500">
                  {errorDisplay("password")}
                </p>
                <input
                  type="password"
                  name="password"
                  className={`${
                    errorDisplay("password") && "transition ease-in bg-red-200"
                  } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7 w-full`}
                  placeholder="Password"
                />
              </div>

              <div className="relative">
                <p className="absolute pl-7 pt-1 text-xs text-red-500">
                  {" "}
                  {errorDisplay("phone")}
                </p>
                <input
                  type="text"
                  name="phone"
                  className={`${
                    errorDisplay("phone") && "transition ease-in bg-red-200"
                  } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7 w-full`}
                  placeholder="Phone"
                />
              </div>

              {/* Nút submit */}
              <button className="w-full py-5 text-neutral-200 mt-6">
                SIGN UP
              </button>
            </Form>

            {/* Phần toggle signup/in */}
            <div className="mt-10 italic text-lg">
              <span className="text-neutral-500">Login ?</span>
              <Link to="/login" className="cursor-pointer ml-2 text-sky-700">
                Click
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
      fullName: data.get("fullName"),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
    };

    const response = await fetch(`${process.env.REACT_APP_API}/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    // Return validation errors
    if (!response.ok) {
      return response;
    }
    return redirect("/login");
  } catch (err) {
    console.log(err);
  }
}
