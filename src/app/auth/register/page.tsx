"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: e.currentTarget.fullname.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }),
    });

    if (res.status === 200) {
      e.target.reset();
      setError("");
      setIsLoading(false);
      push("/auth/login");
    } else {
      setError("Something went wrong, please try again");
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {error !== "" && (
        <div className="mb-2 text-red-500 font-bold">{error}</div>
      )}
      <div className="w-full  rounded-lg  shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Register to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
            <p className="text-sm font-light text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                href="/auth/login"
                className="font-medium hover:underline text-blue-500"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
