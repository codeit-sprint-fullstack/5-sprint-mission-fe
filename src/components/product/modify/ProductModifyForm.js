import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function ProductModifyForm({ product, onClose, onUpdate }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [content, setContent] = useState(product.description);

  const { mutate: updateProduct, isLoading } = useMutation({
    mutationFn: async () => {
      return axios.patch(
        `${process.env.NEXT_PUBLIC_ARL_PANDA_URL}/products/${product.id}`,
        { name, price, content }
      );
    },
    onSuccess: () => {
      alert("상품이 수정되었습니다.");
      onUpdate();
      onClose();
    },
    onError: () => {
      alert("상품 수정 권한이 없습니다.");
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">상품 수정</h2>

        <label className="block mb-2 text-sm font-medium">상품명</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <label className="block mt-3 mb-2 text-sm font-medium">가격</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded"
        />

        <label className="block mt-3 mb-2 text-sm font-medium">설명</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded resize-none"
        ></textarea>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => updateProduct()}
            disabled={isLoading}
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
