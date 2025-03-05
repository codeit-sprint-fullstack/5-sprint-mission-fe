"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function ButtonRound({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-60 flex items-center justify-center gap-2 py-3 bg-primary-100 rounded-3xl text-white"
      {...props}
    >
      {children}
    </button>
  );
}
