"use client";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(0);
  return (
    <div className="text-center">
      <div>
        {/* <h1 className="text-3xl font-bold mx-auto">Hallo Word!</h1> */}
        <p>Ini adalah Action Template : {state}</p>
        <button
          onClick={() => setState(state + 1)}
          className="bg-gray-800 p-2 text-white rounded-sm"
        >
          Click
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
