import Image from "next/image";
import emptyImage from "@/assets/images/Img_reply_empty.png";

export default function EmptyArticle({ keyword }: { keyword?: string }) {
  return (
    <section className="flex flex-col items-center justify-center mx-auto text-gray-400">
      <Image
        src={emptyImage}
        alt="게시글이 없습니다"
        width={140}
        height={140}
      />
      {keyword !== "" ? (
        <p>검색 결과가 없어요,</p>
      ) : (
        <p>아직 게시글이 없어요,</p>
      )}
      <p>지금 게시글을 작성해보세요!</p>
    </section>
  );
}
