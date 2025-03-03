import Image from "next/image";
import heartIcon from "@/assets/images/ic-heart.svg";
import { formatDate } from "@/utils/dateFormat";
import defaultArticleImage from "@/assets/images/laptop.svg";
import defaultUserImage from "@/assets/images/ic-profile.svg";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { deleteArticle } from "@/lib/api";

const DropDown = dynamic(() => import("@/components/DropDown"), {
  ssr: false,
});

function Post({ post }) {
  const router = useRouter();

  const imageUrl = {
    article: post.images[0] || defaultArticleImage,
    user: defaultUserImage,
  };

  const handleEditButtonClick = () => {
    router.push(`/board/${post.id}/edit`);
  };

  const handleDeleteButtonClick = async () => {
    try {
      if (window.confirm("게시글을 삭제하시겠습니까?")) {
        await deleteArticle(post.id);
        router.push("/board");
      }
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-[700] text-gray-800">{post.title}</h1>
        <DropDown
          onEditClick={handleEditButtonClick}
          onDeleteClick={handleDeleteButtonClick}
        />
      </div>
      <div className="flex items-center gap-[32px] my-[16px] pb-[16px] border-b border-gray-200">
        <div className="flex items-center pr-[32px] border-r border-gray-200">
          <Image
            src={imageUrl.user}
            alt="user image"
            width={40}
            height={40}
            className="mr-[16px]"
          />
          <span className="mr-[8px] text-[14px] font-[500] text-gray-600">
            {post.username}
          </span>
          <span className="text-[14px] font-[400] text-gray-400">
            {formatDate(post.createdAt)}
          </span>
        </div>
        <button className="flex items-center gap-[8px] border border-gray-200 rounded-[35px] px-[12px] h-[40px]">
          <Image src={heartIcon} alt="heart" width={20} height={20} />
          <span className="text-[16px] font-[500] text-gray-500">
            {post.likeCount >= 10000 ? "9999+" : post.likeCount}
          </span>
        </button>
      </div>
      <div className="text-[18px] font-[400] text-gray-800">{post.content}</div>
    </>
  );
}

export default Post;
