import Image from "next/image";
import emptyImage from "@/assets/images/Img_reply_empty.png";

export default function EmptyComment() {
  return (
    <section className="flex flex-col items-center justify-center mx-auto text-gray-400">
      <Image src={emptyImage} alt="댓글이 없습니다" width={140} height={140} />
      <p>아직 댓글이 없어요,</p>
      <p>지금 댓글을 달아보세요!</p>
    </section>
  );
}
