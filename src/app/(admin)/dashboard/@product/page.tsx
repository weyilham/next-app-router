"use client";

import { useState } from "react";

export default function Product() {
  const [status, setStatus] = useState("");
  const handleSubmit = async (e: any) => {
    // const token = process.env.NEXT_REVALIDATE_TOKEN || "";
    // e.preventDefault();
    const res = await fetch(`/api/revalidate?tags=product&token=12345`, {
      method: "POST",
    });

    if (!res.ok) {
      setStatus("revalidate failed");
    } else {
      const response = await res.json();
      if (response.revalidate) {
        setStatus("revalidate success");
      }
    }
    // alert("revalidate");
    // setMessage("revalidate success");
  };
  return (
    <div className="p-5">
      {status && <p>{status}</p>}
      <button
        className="text-white bg-gray-800 p-3 rounded-md hover:bg-gray-700"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Revalidate
      </button>
    </div>
  );
}
