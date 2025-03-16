"use client";

import { Button } from "./Button";

export default function Modal({
  message,
  onClick,
}: {
  message: string;
  onClick: () => void;
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-100">
      <div className="flex w-[327px] h-[220px] bg-white rounded-xl">
        <div className="flex flex-col gap-10 justify-center items-center w-full h-full">
          <p className="text-base font-medium text-[#1F2937]">{message}</p>
          <Button name="확인" handleClick={onClick}></Button>
        </div>
      </div>
    </div>
  );
}
