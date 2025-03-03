"use client";

import { useState } from "react";
import { Button } from "./Button";

export default function BoardFormSection() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isFilled = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = () => {
    console.log(title, content);
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 gap-6 max-w-[1200px] mx-auto">
      <TitleArea isFilled={isFilled} handleSubmit={handleSubmit} />
      <TitleFormArea title={title} setTitle={setTitle} />
      <ContentFormArea content={content} setContent={setContent} />
    </div>
  );
}

// 제목
function TitleArea({
  isFilled,
  handleSubmit,
}: {
  isFilled: boolean;
  handleSubmit: () => void;
}) {
  return (
    <div className="flex justify-between items-center mb-2">
      <p className="text-xl font-bold">게시글 쓰기</p>
      <Button name="등록" isDisabled={!isFilled} handleClick={handleSubmit} />
    </div>
  );
}

// 제목 폼 영역
function TitleFormArea({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (title: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-bold">*제목</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요"
        className="w-full px-6 py-4 bg-[#F3F4F6] rounded-xl"
      />
    </div>
  );
}

// 내용 폼 영역
function ContentFormArea({
  content,
  setContent,
}: {
  content: string;
  setContent: (content: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-bold">*내용</p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력해주세요"
        className="w-full px-6 py-4 min-h-[300px] bg-[#F3F4F6] rounded-xl"
      />
    </div>
  );
}
