import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Collapse, Stack } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export const EditEllipsis = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Stack sx={editEllipsisContainerStyle}>
      <Image
        src="/assets/ic_kebab.svg"
        alt="edit"
        width={24}
        height={24}
        onClick={handleToggle}
      />
      <Collapse in={isExpanded} sx={editCollapseStyle}>
        <Typo
          className="text16Regular"
          content="수정하기"
          color={colorChips.gray500}
          customStyle={{
            paddingRight: "50px",
            wordBreak: "keep-all",
            cursor: "pointer",
          }}
        />
        <Typo
          className="text16Regular"
          content="삭제하기"
          color={colorChips.gray500}
          customStyle={{
            paddingRight: "50px",
            wordBreak: "keep-all",
            cursor: "pointer",
          }}
        />
      </Collapse>
    </Stack>
  );
};

const editEllipsisContainerStyle = {
  width: "24px",
  height: "24px",
};

const editCollapseStyle = {
  position: "absolute",
  top: "24px",
  right: "0",
  width: "140px",
  height: "92px",
  backgroundColor: colorChips.white,
  borderRadius: "8px",
  border: `1px solid ${colorChips.gray300}`,
  boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.10)",
};
