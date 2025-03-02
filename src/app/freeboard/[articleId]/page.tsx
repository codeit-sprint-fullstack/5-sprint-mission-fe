"use client";

import { Stack } from "@mui/material";
import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { Features } from "./feature";
import { useParams } from "next/navigation";
import { CommonLayout } from "@/shared/layout/CommonLayout";

export default function Page() {
  const { articleId } = useParams();
  // const { data, isLoading } = useCompanyDetail();

  //   if (isLoading || !data) return <Features.CompanyDetailSkeleton />;

  // const { intro, about, interview, news, info, hotPlaces } = data;

  return (
    <CommonLayout>
      <Stack sx={articleDetailContainerStyle}>
        <Features.ArticleDetails />
        <Features.CommentList />
        <Features.CommentInput />
      </Stack>
    </CommonLayout>
  );
}

const articleDetailContainerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingX: { xs: "16px", sm: "24px" },
  pt: { xs: "24px", sm: "26px", md: "34px" },
  pb: "100px",
  gap: "32px",
};
