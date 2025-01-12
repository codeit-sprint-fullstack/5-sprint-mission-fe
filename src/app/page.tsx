"use client";

import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    window.location.href = "/store";
  }, []);
  return <div>판다 마켓</div>;
}
