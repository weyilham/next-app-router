"use client";
import { data } from "autoprefixer";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// const disableNavigation = ["/login", "/register"];

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session, status }: { data: any; status: string } = useSession();

  // console.log(session);

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
      {status === "authenticated" ? (
        <div className="flex">
          {session.user && (
            <p className="text-white mr-4">{session?.user?.fullname}</p>
          )}
          {/* <p className="text-white mr-4">Ilham Maulana</p> */}
          <button
            className="text-white px-3 rounded-sm bg-yellow-500"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            className="text-white px-3 rounded-sm bg-yellow-500"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
