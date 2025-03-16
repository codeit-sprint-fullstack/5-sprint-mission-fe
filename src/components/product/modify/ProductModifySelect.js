import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import kebabIcon from "@images/dropdown-icon/ic_kebab.png";
import modalIcon from "@images/modal-icon/ic_check.png";
import axios from "axios";
import ProductModifyForm from "./ProductModifyForm";

export default function ProductModifySelect({ product, onDelete, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  const deleteProduct = useMutation({
    mutationFn: async () => {
      return axios.delete(
        `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/products/${product.id}`
      );
    },
    onSuccess: () => {
      alert("상품이 삭제되었습니다.");
      onDelete && onDelete();
      router.push("/items");
    },
    onError: () => {
      alert("상품 삭제 실패");
    },
  });

  return (
    <div className="relative">
      <button onClick={() => setIsOpen((prev) => !prev)} className="p-2">
        <Image src={kebabIcon} alt="옵션" className="w-[24px] object-contain" />
      </button>

      {isOpen && (
        <ul className="absolute w-[102px] md:w-[139px] border border-custom-color-border-gray rounded-xl bg-white right-0  top-6 z-9">
          <li
            className="px-5 py-3 text-nowrap border-b border-custom-color-border-gray cursor-pointer"
            onClick={() => {
              setIsEditing(true);
              setIsOpen(false);
            }}
          >
            수정하기
          </li>
          <li
            className="px-5 py-3 cursor-pointer "
            onClick={() => setIsConfirming(true)}
          >
            삭제하기
          </li>
        </ul>
      )}

      {isConfirming && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="flex flex-col items-center gap-2.5  bg-white p-6 rounded-lg w-96">
            <Image src={modalIcon} alt="경고 모달 아이콘" width={24} />
            <p className="text-gray-600 font-medium mb-4">
              정말로 상품을 삭제하시겠어요?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-8 py-3 bg-white font-semibold rounded-lg border border-custom-color-red text-custom-color-red"
                onClick={() => setIsConfirming(false)}
              >
                취소
              </button>
              <button
                className="px-8 py-3 bg-red-500 font-semibold text-white rounded-lg"
                onClick={() => deleteProduct.mutate()}
                disabled={deleteProduct.isLoading}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <ProductModifyForm
          product={product}
          onClose={() => setIsEditing(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
    // <button className="relative group " onClick={() => setIsOpen(!isOpen)}>
    //   <Image src={kebabIcon} alt="옵션" className="w-[24px] object-contain" />
    //   {isOpen && (
    //     <ul className="absolute w-[102px] md:w-[139px] border border-custom-color-border-gray rounded-xl bg-white right-0  top-6 z-9">
    //       <li
    //         className="px-5 py-3 text-nowrap border-b border-custom-color-border-gray cursor-pointer"
    //         onClick={() => setIsEditing(true)}
    //       >
    //         수정하기
    //       </li>
    //       <li
    //         className="px-5 py-3 text-nowrap cursor-pointer"
    //         onClick={() => deleteProduct()}
    //       >
    //         삭제하기
    //       </li>
    //     </ul>
    //   )}
    // </button>
  );
}
