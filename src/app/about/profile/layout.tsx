import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="fixed top-12 left-0 z-10 h-screen w-60 bg-gray-700 py-10 ">
        <ul className="text-white flex flex-col gap-5 px-3">
          <li className="font-bold bg-yellow-400 p-2">Home</li>
          <li>About</li>
          <li>Profile</li>
        </ul>
      </nav>
      <div>
        <h1 className="text-3xl font-bold text-right mr-3">
          Ini adalah Layout
        </h1>
      </div>
      <div>{children}</div>
    </>
  );
}
