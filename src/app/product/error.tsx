"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl">Someting went Wrong!</h1>
      <button
        onClick={() => reset()}
        className="text-white bg-blue-700 p-3 text-center mt-3 rounded-md"
      >
        Try Again
      </button>
    </div>
  );
}
