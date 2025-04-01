import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/Common/modals/Modal";
import { createProduct } from "@/services/api/products";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";
import Image from "next/image";
export default function ProductRegisterPage({ product }) {
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [imageFiles, setImageFiles] = useState([]); // 이미지 파일 배열로 저장
  const [imagePreviews, setImagePreviews] = useState([]);

  // useRef 훅으로 fileInputRef 정의
  const fileInputRef = useRef(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",

      tags: [], // 첫 번째 이미지 URL 사용
    },
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log("상품 등록 성공 응답:", data);
      console.log("이미지 경로:", data.images);
      setModalMessage("상품이 성공적으로 등록되었습니다.");
      setIsModalOpen(true);
      const productId = data.id;
      router.push(`/items/${productId}`);
    },
    onError: (error) => {
      if (error.response) {
        console.log("서버 응답 데이터:", error.response.data);
        setModalMessage("상품 등록에 실패했습니다.");
      } else {
        console.log("에러 메시지:", error.message);
        setModalMessage("서버와 통신할 수 없습니다.");
      }
      setIsModalOpen(true);
    },
  });
  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (imageFiles.length + files.length > 3) {
      setModalMessage("이미지는 최대 3개까지만 업로드할 수 있습니다.");
      setIsModalOpen(true);
      return;
    }
    // 새 이미지 파일 추가
    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);

    const newPreviews = [...imagePreviews];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviews.push({
          id: Math.random().toString(36).substring(7), // 랜덤 ID 생성
          src: event.target.result,
          file: file,
        });
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });

    // 파일 인풋 초기화
    e.target.value = "";
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  /// 이미지 미리보기 삭제 핸들러
  const removeImagePreview = (id) => {
    const updatedPreviews = imagePreviews.filter(
      (preview) => preview.id !== id
    );
    setImagePreviews(updatedPreviews);

    const updatedFiles = imageFiles.filter(
      (file) =>
        !imagePreviews.find(
          (preview) => preview.id === id && preview.file === file
        )
    );
    setImageFiles(updatedFiles);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);

    // 태그 추가
    if (tags.length > 0) {
      formData.append("tags", tags.join(","));
    }

    // 이미지 파일 추가
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      // 이미지가 없는 경우 빈 배열
      formData.append("images", JSON.stringify([]));
    }

    // API 호출
    mutation.mutate(formData);
  };

  // 태그 추가
  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  // 태그 삭제
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <AuthLayout>
      <div className="flex flex-col items-center min-h-screen px-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md md:max-w-xl lg:max-w-[1200px] bg-white p-6 rounded-md"
        >
          <div className="w-full flex justify-between">
            <h1 className="text-2xl whitespace-nowrap font-bold mb-8">
              상품 등록하기
            </h1>
            {/* 상품 등록 버튼 */}
            <button
              type="submit"
              className=" bg-[#9CA3AF] mb-6 cursor-pointer text-white rounded-lg px-6 h-[42px] font-bold hover:bg-[#3692FF]"
            >
              등록
            </button>
          </div>
          {/* 이미지 업로드 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              상품 이미지
            </label>

            {/* 숨겨진 파일 입력 */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <div className="mb-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* 이미지 미리보기 */}
                {imagePreviews.map((preview) => (
                  <div
                    key={preview.id}
                    className="w-[282px] h-[282px] rounded-2xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={preview.src}
                      alt="미리보기"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImagePreview(preview.id)}
                      className="absolute top-2 right-2 px-2 py-1 rounded-full bg-[#9CA3AF] text-white z-30 w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* 이미지 추가 버튼 3개 미만일 때만 표시 */}
                {imagePreviews.length < 3 && (
                  <label className="w-[282px] h-[282px] rounded-2xl flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition">
                    <span className="text-gray-400 text-4xl mb-2">+</span>
                    <span className="text-gray-400">이미지 등록</span>
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="mt-2">
                <span className="text-sm text-red-600">
                  *이미지 등록은 최대 3개까지 가능합니다.
                </span>
              </div>
            </div>
          </div>

          {/* 상품 이름 입력 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">상품명</label>
            <input
              type="text"
              {...register("name", { required: "상품명을 입력하세요." })}
              className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
              placeholder="상품명을 입력하세요"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* 상품 설명 입력 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              상품 소개
            </label>
            <textarea
              {...register("description", {
                required: "상품 소개를 입력하세요.",
              })}
              className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
              placeholder="상품 소개를 입력하세요"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* 상품 가격 입력 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              판매가격
            </label>
            <input
              type="number"
              {...register("price", { required: "판매가격을 입력하세요." })}
              className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
              placeholder="판매가격을 입력하세요"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">태그</label>
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(e.target.value.trim());
                  e.target.value = "";
                }
              }}
              className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
              placeholder="태그를 입력하세요"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full"
              >
                #{tag}
                <Image
                  src="/ic_X.png"
                  className="ml-2 text-red-500 cursor-pointer"
                  onClick={() => removeTag(tag)}
                  width={16}
                  height={16}
                  alt="Remove"
                />
              </span>
            ))}
          </div>
        </form>

        {/* 모달 */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalMessage}
        />
      </div>
    </AuthLayout>
  );
}
