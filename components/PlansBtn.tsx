"use client"

import React from "react";
import { useRouter } from "next/navigation";

function PlansBtn() {
  const router = useRouter();

  return (
    <button
      className="ml-3 rounded-md transition-all px-5 py-3 hover:text-222 bg-222 hover:bg-gray-200 text-white hover:transition-all hover:duration-300 duration-300"
      onClick={() => router.push("/plans")}
    >
      Go Pro
    </button>
  );
}

export default PlansBtn;
