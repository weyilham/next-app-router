"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage({ searchParams }: any) {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.callbackUrl || "/";
  // const { data: session } = useSession();
  // console.log(session);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        // console.log(res);
        if (res.status === 401) {
          setIsLoading(false);
          setError("Invalid email or password");
        }
      }
    } catch (error) {
      console.log(error);
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
            Sign in to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleSubmit(e)}
          >
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
              {isLoading ? "Loading..." : "Sign in"}
            </button>
            <hr />
            <button
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              disabled={isLoading}
              type="button"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
            >
              {isLoading ? "Loading..." : "Sign in With Google"}
            </button>
            <p className="text-sm font-light text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                href="/auth/register"
                className="font-medium hover:underline text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
