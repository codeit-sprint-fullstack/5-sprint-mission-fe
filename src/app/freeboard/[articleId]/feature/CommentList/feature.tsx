import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";

export const CommentList = () => {
  return (
    <Stack>
      <Typo
        className="text20Bold"
        content="댓글 목록"
        color={colorChips.gray900}
      />
    </Stack>
  );
};
