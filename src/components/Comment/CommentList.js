import { useState } from "react";
import Comment from "./Comment.js";
import Image from "next/image";
import { useType } from "../../contexts/TypeContext";
import { fetchProductComments } from "@/services/api/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function CommentList({ id, comments }) {
  const currentType = useType();
  const queryClient = useQueryClient();
  // 데이터 로드 및 오류 처리
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["comments", id], // react-query v5에서는 queryKey로 배열을 사용
    queryFn: () => fetchProductComments(id), // 상품 ID로 댓글 데이터 불러오기
  });

  // 댓글이 없을 때 이미지 및 텍스트 설정
  const getImageConfig = () => {
    const imageConfig = {
      product: {
        src: "/noInquary.svg",
        text: "",
      },
      article: {
        src: "/noreply.svg",
        text: "아직 댓글이 없어요.",
      },
    };
    return imageConfig[currentType] || imageConfig.article;
  };

  const handleDelete = (deletedCommentId) => {
    // 댓글을 삭제한 후 데이터 갱신
    const updatedComments = data.list.filter(
      (comment) => comment.id !== deletedCommentId
    );

    // react-query에 데이터 갱신
    queryClient.setQueryData(["comments", id], {
      ...data,
      list: updatedComments,
    });
  };

  // 댓글 업데이트 처리
  const handleUpdate = (updatedComment) => {
    const updatedComments = data.list.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );

    // react-query에 데이터 갱신
    queryClient.setQueryData(["comments", id], {
      ...data,
      list: updatedComments,
    });
  };

  // 댓글 데이터가 없을 경우 이미지 및 텍스트 렌더링
  const { src: imageSrc, text } = getImageConfig();
  const finalComments = data?.list || comments;

  if (finalComments.length === 0 && !isLoading && !isFetching) {
    return (
      <div className="flex flex-col items-center mt-8 text-gray-500">
        <Image src={imageSrc} alt={text} width={151} height={208} />
        <p className="mt-2 text-center text-sm">
          {text}
          <br />
          {currentType === "article" && "지금 댓글을 달아보세요!"}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {finalComments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          id={id}
          type={currentType}
        />
      ))}
    </div>
  );
}
