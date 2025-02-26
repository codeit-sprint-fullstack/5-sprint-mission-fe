import type { ArticleComment } from "@/types";
import iconProfile from "@/assets/icons/ic_profile.png";
import Image from "next/image";
import timeTracker from "@/utils/timeTracker";

export default function CommentItem({ comment }: { comment: ArticleComment }) {
  const { content, author, updatedAt } = comment;

  return (
    <article className="bg-[#fcfcfc] border-b border-gray-200">
      <p className="text-gray-800 mb-6">{content}</p>
      <section className="flex items-center gap-2 mb-2 md:mb-3">
        <Image src={iconProfile} alt="profile" width={40} height={40} />
        <span className="text-xs font-normal">
          <p className="text-gray-600">{author}</p>
          <p className="text-gray-400">{timeTracker(updatedAt)}</p>
        </span>
      </section>
    </article>
  );
}
