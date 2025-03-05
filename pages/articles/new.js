import { useRouter } from "next/router";
import { useState } from "react";
import { createArticle } from "../api/articles";

export default function NewArticlePage() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (newTitle.trim().length === 0 || newContent.trim().length === 0) {
      alert("제목과 내용을 모두 입력해주세요");
      return;
    }
    try {
      const response = await createArticle({
        title: newTitle,
        content: newContent,
        username: "User",
        image:
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTBfMTIx%2FMDAxNzI1OTM3OTE1MDAx.wcSSz1sGl2_3fufgewO03yQnOHAu7RL1lbXMdo-eVcgg.VB3SgH32Bshel4bEDmuvji0A5Jwp1OOYmvI22vSD3rgg.JPEG%2FScreenshot_1781.jpg&type=sc960_832",
      });

      console.log("등록 성공 응답:", response);
      alert("게시글 등록 완료!");
      setNewTitle("");
      setNewContent("");

      router.push("/articles");
    } catch (error) {
      console.error(error);
      alert("게시글 등록 실패!", error.response || error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto my-10 px-[15px] ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">게시글 쓰기</h1>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">*제목</label>
        <textarea
          type="text"
          placeholder="제목을 입력해주세요"
          className="w-full bg-gray-100 p-4 rounded-lg outline-none resize-none"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">*내용</label>
        <textarea
          placeholder="내용을 입력해주세요"
          className="w-full bg-gray-100 p-4 rounded-lg outline-none h-60 resize-none"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      </div>
    </div>
  );
}
