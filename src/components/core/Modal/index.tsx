"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overley = useRef(null);
  const router = useRouter();

  const close: MouseEventHandler = (e) => {
    if (e.target === overley.current) {
      router.back();
    }
  };
  return (
    <div
      ref={overley}
      className="fixed z-10 right-0 left-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={close}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-md">
        {children}
      </div>
    </div>
  );
}
