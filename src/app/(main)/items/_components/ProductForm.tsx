"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import baseImg from "@/shared/assets/Img/base-image/baseImg.png";
import PlusIcon from "@/shared/assets/Img/input-icon/ic_plus.png";
import CloseIcon from "@/shared/assets/Img/button-image/X-round-Icon.png.png";
import { useCreateProduct, useEditProduct } from "@/api/product/productHooks";
import { Product } from "@/types";

interface ProductFormProps {
  category: "create" | "edit";
  initialData?: Product;
}

export default function ProductForm({
  category,
  initialData,
}: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price || 0);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    initialData?.imageUrls || []
  );

  const createMutation = useCreateProduct({
    onSuccess: () => router.push("/items"),
  });
  const updateMutation = useEditProduct(initialData?.id ?? "", {
    onSuccess: () => router.push("/items"),
  });

  useEffect(() => {
    if (initialData?.imageUrls) {
      setPreviewUrls(initialData.imageUrls);
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(previews);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("상품명과 설명을 입력해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    tags.forEach((tag) => formData.append("tags", tag));
    images.forEach((img) => formData.append("images", img));

    console.log("formData", formData);
    if (category === "create") {
      createMutation.mutate(formData);
    } else if (category === "edit" && initialData?.id) {
      updateMutation.mutate(formData);
    }
  };

  const removeImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-6 pb-[200px]"
    >
      <section className="flex justify-between">
        <h1 className="text-xl font-bold text-custom-text-black-800">
          {category === "create" ? "상품 등록하기" : "상품 수정하기"}
        </h1>
        <button
          type="submit"
          className="px-6 py-2 bg-custom-color-blue text-white font-semibold rounded-lg"
        >
          {category === "create" ? "등록" : "수정"}
        </button>
      </section>

      <section className="flex flex-col gap-10 w-full">
        <div className="w-full xl:w-1/2">
          <label className="text-lg font-bold text-custom-text-black-800">
            *상품 이미지
          </label>
          <div className="mt-4 flex gap-4">
            {previewUrls.length < 3 && (
              <label className="flex flex-col items-center justify-center w-[120px] h-[120px] bg-custom-input-gray-100 rounded-md cursor-pointer shrink-0">
                <Image
                  src={PlusIcon}
                  alt="이미지 추가"
                  width={32}
                  height={32}
                />
                <p className="text-xs text-gray-400 mt-1">이미지 등록</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </label>
            )}

            <div className="flex flex-wrap gap-4">
              {previewUrls.map((url, i) => (
                <div key={i} className="relative w-24 h-24">
                  <Image
                    src={url || baseImg.src}
                    alt={`preview-${i}`}
                    fill
                    className="object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2"
                  >
                    <Image src={CloseIcon} alt="닫기" width={20} height={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 상품 입력 정보 */}
        <div className="flex-1 flex flex-col gap-6">
          <section>
            <label className="text-lg font-bold text-custom-text-black-800">
              *상품명
            </label>
            <input
              type="text"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 bg-custom-input-gray-100 rounded-xl focus:outline-none"
            />
          </section>

          <section>
            <label className="text-lg font-bold text-custom-text-black-800">
              *상품 소개
            </label>
            <textarea
              placeholder="상품 설명을 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[240px] px-6 py-4 bg-custom-input-gray-100 rounded-xl resize-none focus:outline-none"
            />
          </section>

          <section>
            <label className="text-lg font-bold text-custom-text-black-800">
              판매 가격
            </label>
            <input
              type="number"
              placeholder="숫자만 입력해주세요"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-6 py-4 bg-custom-input-gray-100 rounded-xl focus:outline-none"
            />
          </section>

          <section>
            <label className="text-lg font-bold text-custom-text-black-800">
              태그
            </label>
            <div className="flex gap-2 mt-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                placeholder="태그를 입력해주세요"
                className="w-full px-6 py-3 bg-custom-input-gray-100 rounded-xl focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-4 py-2 text-sm bg-custom-color-border-gray rounded-full cursor-pointer"
                >
                  #{tag}
                  <Image
                    src={CloseIcon}
                    alt="태그 삭제"
                    width={14}
                    height={14}
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1"
                  />
                </span>
              ))}
            </div>
          </section>
        </div>
      </section>
    </form>
  );
}
