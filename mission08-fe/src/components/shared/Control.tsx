"use client";

import { useCallback, useMemo, useState } from "react";
import Menu from "./Menu";
import Image from "next/image";
import iconKebab from "@/assets/icons/ic_kebab.png";

interface ControlProps {
  onDelete: () => void;
  onEdit: () => void;
}

export default function Control({ onDelete, onEdit }: ControlProps) {
  const [isShow, setIsShow] = useState(false);

  const handleClick = useCallback(() => setIsShow((prev) => !prev), []);

  const menuItems = useMemo(
    () => [
      {
        label: "삭제하기",
        onClick: () => {
          onDelete();
          handleClick();
        },
      },
      {
        label: "수정하기",
        onClick: () => {
          onEdit();
          handleClick();
        },
      },
    ],
    [handleClick, onDelete, onEdit]
  );

  return (
    <div className="absolute top-0 right-0">
      <div className="relative cursor-pointer" onClick={handleClick}>
        <Image
          src={iconKebab}
          alt="삭제 및 수정하기 아이콘"
          width={24}
          height={24}
        />
      </div>
      {isShow && <Menu menuItems={menuItems} />}
    </div>
  );
}
