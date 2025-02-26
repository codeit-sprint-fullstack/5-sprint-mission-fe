"use client";

import Image from "next/image";
import iconSort from "@/assets/icons/ic_sort.png";
import iconArrowDown from "@/assets/icons/ic_arrow_down.png";
import { useState } from "react";
import Menu from "./Menu";
import { SortBy } from "@/types";

interface FilterProps {
  sortBy: SortBy;
  onSort: (sortBy: SortBy) => void;
}

export default function Filter({ sortBy, onSort }: FilterProps) {
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => setIsShow((prev) => !prev);

  const menuItems = [
    {
      label: "최신순",
      onClick: () => {
        onSort("latest");
        handleClick();
      },
    },
    {
      label: "인기순",
      onClick: () => {
        onSort("favorite");
        handleClick();
      },
    },
  ];

  return (
    <div className="relative ">
      <div
        className="md:w-[130px] md:flex md:items-center md:justify-between bg-white border border-gray-200 rounded-xl p-2 md:px-5 md:py-3 hover:cursor-pointer"
        onClick={handleClick}
      >
        <p className="hidden md:block text-gray-800 font-normal text-base">
          {sortBy === "latest" ? "최신순" : "인기순"}
        </p>
        <Image
          src={iconArrowDown}
          alt="필터"
          width={24}
          height={24}
          className="hidden md:block"
        />
        <Image
          src={iconSort}
          alt="필터"
          width={24}
          height={24}
          className="md:hidden"
        />
      </div>

      {isShow && <Menu menuItems={menuItems} />}
    </div>
  );
}
