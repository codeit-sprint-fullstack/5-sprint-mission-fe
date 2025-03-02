import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import { useArticleDetail } from "../../core/hooks/useArticleDetailQuery";
import { EditEllipsis } from "../../core/components/EditEllipsis";
export const ArticleDetails = () => {
  const { data, isLoading } = useArticleDetail();

  if (isLoading || !data) {
    return (
      <Typo className="text20Bold" content="게시글 정보를 불러오는 중입니다." />
    );
  }

  const { title, content, image, favoritesCount, createdAt } = data;

  return (
    <Stack>
      <Typo className="text20Bold" content={title} color={colorChips.gray900} />
      <Typo
        className="text16Regular"
        content={content}
        color={colorChips.gray900}
      />
      <Typo className="text20Bold" content={image} color={colorChips.gray900} />
      <Typo
        className="text20Bold"
        content={favoritesCount.toString()}
        color={colorChips.gray900}
      />
      <Typo
        className="text20Bold"
        content={createdAt}
        color={colorChips.gray900}
      />
      <EditEllipsis />
    </Stack>
  );
};
