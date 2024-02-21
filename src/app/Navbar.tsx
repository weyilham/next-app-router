"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// const disableNavigation = ["/login", "/register"];

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  // console.log(pathName);

  return (
    <div className="flex bg-gray-800 py-3 px-5 justify-between items-center">
      <h1 className="text-white font-bold">Navbar</h1>
      <div className="menu-nav">
        <ul className="mx-auto flex gap-5 text-white">
          <li
            className={
              pathName === "/" ? "text-yellow-400 font-bold" : "text-white"
            }
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={
              pathName === "/about" ? "text-yellow-400 font-bold" : "text-white"
            }
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={
              pathName === "/about/profile"
                ? "text-yellow-400 font-bold"
                : "text-white"
            }
          >
            <Link href="/about/profile">Profile</Link>
          </li>
          <li
            className={
              pathName === "/product"
                ? "text-yellow-400 font-bold"
                : "text-white"
            }
          >
            <Link href="/product">Product</Link>
          </li>
        </ul>
      </div>
      <button
        className="text-white px-3 rounded-sm bg-yellow-500"
        onClick={() => {
          router.push("/auth/login");
        }}
      >
        Login
      </button>
    </div>
  );
}
