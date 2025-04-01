import { useState } from "react";
import ToggleDropdown from "@/components/ToggleDropdown";
import Image from "next/image";
import dayjs from "dayjs";
import HeartTag from "@/components/HeartTag";
import { useRouter } from "next/router";
import { DoubleCheckModal } from "@/Common/modals/DoubleCheckModal";
import { Modal } from "@/Common/modals/Modal";
import Tag from "../Tag";
import { deleteProduct } from "@/services/api/products";

export default function ProductDetail({ product, onDelete }) {
  const router = useRouter();
  const username = product.ownerNickname || "귀여운 판다";
  console.log("작성자", product.ownerId);

  const [isDoubleCheckModalOpen, setIsDoubleCheckModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 수정용 모달 상태
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  // 삭제 버튼 클릭 시 모달 열기
  const handleOpenDoubleCheckModal = (isAuthorized) => {
    if (isAuthorized) {
      setMessage("정말로 상품을 삭제하시겠어요?");
      setIsDoubleCheckModalOpen(true);
    } else {
      setMessage("작성자만 상품을 삭제할 수 있습니다.");
      setIsModalOpen(true); // 권한 없으면 Modal
    }
  };

  // 수정 버튼 클릭 시 모달 열기
  const handleOpenModal = (isAuthorized) => {
    if (isAuthorized) {
      handleEdit(product.id);
    } else {
      setMessage("작성자만 상품을 수정할 수 있습니다.");
      setIsModalOpen(true);
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDoubleCheckModalOpen(false);
  };

  // // 삭제 확인 시 API 호출하고 리다이렉션
  // const handleDeleteConfirm = async () => {
  //   try {
  //     await onDelete(product.id); // 상품 삭제 API 호출
  //     router.push("/items"); // 삭제 후 /items로 리다이렉션
  //   } catch (error) {
  //     console.error("상품 삭제 오류:", error);
  //     setMessage("상품 삭제에 실패했습니다.");
  //     setIsModalOpen(true); // 오류 발생 시 일반 모달 띄우기
  //   }
  // };

  const handleEdit = () => {
    if (user.id === product.ownerId) {
      router.push(`/items/${product.id}/edit`);
    } else {
      setMessage("작성자만 상품을 수정할 수 있습니다.");
      setIsModalOpen(true);
    }
  };

  const userId = user ? user.id : null;
  // console.log(userId);

  return (
    <section className="max-w-[1200px] mx-auto px-4 w-full md:flex md:justify-between md:gap-4">
      <div className="Image">
        <div className="relative w-[340px] h-[340px] ">
          <Image
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : "/img_default.png"
            }
            layout="fill"
            objectFit="cover"
            alt="product"
            className="rounded-xl"
          />
        </div>
      </div>
      <div className="flex-1">
        <section>
          <div className="flex justify-between">
            <h2 className="font-bold text-xl whitespace-nowrap mt-4 md:mt-0">
              {product.name}
            </h2>

            <ToggleDropdown
              onEdit={() => handleOpenModal(userId === product.ownerId)}
              id={product.id}
              onDelete={() =>
                handleOpenDoubleCheckModal(userId === product.ownerId)
              }
            />
          </div>
          <p className="font-bold text-lg mt-2">
            {new Intl.NumberFormat().format(product.price)} 원
          </p>
          <div className="border-t border-gray-300 my-2 mb-4 md:w-full"></div>
          <div className="mb-6 text-[#1F2937]">
            <h2 className="font-semibold mb-3 text-sm">상품 소개</h2>
            <p className="text-[16px]">{product.description}</p>{" "}
          </div>
          <div>
            <h2 className="font-semibold mb-3 text-sm">상품 태그</h2>

            {product.tags.length > 0 ? (
              <div className="flex space-x-2 mb-30">
                {product.tags.map((tag, i) => (
                  <Tag key={i} tags={tag} />
                ))}
              </div>
            ) : (
              <div className="mb-10 md:mb-44"></div> // 태그가 없을 경우 여백
            )}
          </div>

          <div className="flex justify-between md:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={user.image || "/ic_profile.png"}
                width={40}
                height={40}
                alt="profile"
              />
              <div className="flex flex-col">
                <span>{username}</span>
                <span className="text-[#4B5563] font-medium">
                  {dayjs(product.createdAt).format("YYYY.MM.DD")}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="border-l border-gray-300 mx-2 h-8"></div>
              <HeartTag product={product} />
            </div>
          </div>
        </section>
      </div>
      {/* <div className="border-t border-gray-300 my-6 mb-4"></div> */}

      {/* ✅ 모달 추가 */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={message} // 수정 또는 권한 없는 경우
      />

      <DoubleCheckModal
        isOpen={isDoubleCheckModalOpen}
        onClose={handleCloseModal}
        message={message} //정말로 삭제?
        onDelete={onDelete} // 네 버튼 클릭 시 삭제 실행
      />
    </section>
  );
}
