import Image from "next/image";
import macbook from "../../assets/images/macbook.png";
import sampleProfile from "../../assets/icons/ic_profile.svg";
import HeartIcon from "../../assets/icons/ic_heart.svg";
import { Post } from "@/services/postServices";
import { useState } from "react";
import { likePost } from "@/services/postServices";

export default function BoardListItem({ post }: { post: Post }) {
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLikeClick = async () => {
    try {
      const updatedPost = await likePost(post.id);
      setLikeCount(updatedPost.likes);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="flex flex-col h-[138px] pb-6 border-b border-[#E5E7EB]">
      {/* 상단 */}
      <div className="flex">
        <p className="text-lg sm:text-xl font-semibold">{post.title}</p>
        <div className="flex-grow" />
        <Image
          className="ml-2"
          src={macbook}
          alt="macbook"
          width={72}
          height={72}
        />
      </div>
      <div className="flex-grow" />
      {/* 하단 */}
      <div className="flex gap-2">
        <Image src={sampleProfile} alt="profile" width={24} height={24} />
        <p className="text-sm font-normal text-[#4B5563]">{post.authorName}</p>
        <p className="text-sm font-normal text-[#9CA3AF]">{post.createdAt}</p>
        <div className="flex-grow" />
        <div className="flex gap-2 cursor-pointer" onClick={handleLikeClick}>
          <Image src={HeartIcon} alt="heart" width={24} height={24} />
          <p className="text-base font-normal text-[#6B7280]">{likeCount}</p>
        </div>
      </div>
    </div>
  );
}
