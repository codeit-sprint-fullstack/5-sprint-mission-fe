"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: ReactNode;
}

export default function ButtonRectangle({
  isActive,
  children,
  ...props
}: ButtonProps) {
  const activeStyle = isActive
    ? "bg-primary-100 hover:bg-primary-200 cursor-pointer"
    : "bg-gray-400";

  return (
    <button
      className={`${activeStyle} px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out`}
      disabled={!isActive} // 버튼 비활성화
      {...props} // type, onClick 등 기타 속성 전달
    >
      <p className="text-white text-base font-sm leading-5">{children}</p>
    </button>
  );
}
