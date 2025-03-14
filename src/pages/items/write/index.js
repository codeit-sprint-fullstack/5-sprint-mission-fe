import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const WriteItem = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: null,
    tag: "",
    tags: [],
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [isActive, setIsActive] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosClient.post("/products", data);
    },
    onError: (error, variables, context) => {},
    onSuccess: (res) => {
      router.push("/items");
    },
  });

  const validateField = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    let error = "";

    // 값이 비어있으면 필드별 기본 에러 메시지 설정
    if (!trimmedValue) {
      const emptyMessages = {
        name: "상품명을 입력해주세요",
        description: "상품 소개를 입력해주세요",
        price: "판매가격을 입력해주세요",
        tag: "태그를 입력해주세요",
      };
      error = emptyMessages[name] || "값을 입력해주세요";
    } else {
      // 값이 있을 때 각 필드별 조건 검증
      switch (name) {
        case "name":
          if (trimmedValue.length > 10) error = "10자 이내로 입력해주세요";
          break;
        case "description":
          if (trimmedValue.length < 9) error = "10자 이상 입력해주세요";
          break;
        case "price":
          if (!/^\d+$/.test(trimmedValue)) error = "숫자로 입력해주세요";
          break;
        case "tag":
          if (trimmedValue.length > 5) error = "5글자 이내로 입력해주세요";
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    const trimmedTag = formData.tag.trim();
    if (trimmedTag !== "" && !formData.tags.includes(trimmedTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
        tag: "",
      }));
    } else {
      // 중복이거나 빈 값인 경우 입력 필드를 초기화합니다.
      setFormData((prev) => ({ ...prev, tag: "" }));
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmitProduct = () => {
    const { tag, ...data } = formData;
    mutation.mutate(data);
  };

  useEffect(() => {
    const { name, description, price } = formData;
    // 필드에 에러가 있는지 확인
    const hasError = errors.name || errors.description || errors.price;
    // 필수 필드에 값이 있는지 확인 (공백 제거 후)
    const missingFields = !name.trim() || !description.trim() || !price;
    setIsActive(!(hasError || missingFields));
  }, [errors, formData]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="text-xl text-[#1F2937] font-bold">상품 등록하기</div>
        <button
          onClick={handleSubmitProduct}
          className={clsx(
            "w-[74px] h-[42px] rounded-lg text-base text-[#F3F4F6] font-semibold",
            isActive ? "bg-[#3692FF]" : "bg-[#9CA3AF]"
          )}
          disabled={!isActive}
        >
          등록
        </button>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <div className="text-lg text-[#1F2937] font-bold">상품명</div>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={validateField}
            placeholder="상품명을 입력해주세요"
            className={clsx(
              "px-6 w-full h-[56px] bg-[#F3F4F6] rounded-xl mt-3",
              {
                ["outline outline-2 outline-red-400"]: errors.name,
                ["focus:outline outline-2 outline-blue-400"]: !errors.name,
              }
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>
        <div>
          <div className="text-lg text-[#1F2937] font-bold">상품 소개</div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={validateField}
            placeholder="상품 소개를 입력해주세요"
            className={clsx(
              "py-4 px-6 w-full h-[282px] bg-[#F3F4F6] rounded-xl mt-3",
              {
                ["outline outline-2 outline-red-400"]: errors.description,
                ["focus:outline outline-2 outline-blue-400"]:
                  !errors.description,
              }
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
          )}
        </div>
        <div>
          <div className="text-lg text-[#1F2937] font-bold">판매가격</div>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            onBlur={validateField}
            placeholder="판매 가격을 입력해주세요"
            className={clsx(
              "px-6 w-full h-[56px] bg-[#F3F4F6] rounded-xl mt-3",
              {
                ["outline outline-2 outline-red-400"]: errors.price,
                ["focus:outline outline-2 outline-blue-400"]: !errors.price,
              }
            )}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-2">{errors.price}</p>
          )}
        </div>
      </div>
      <form onSubmit={handleTagSubmit}>
        <div className="text-lg text-[#1F2937] font-bold">태그</div>
        <input
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          onBlur={validateField}
          placeholder="태그를 입력해주세요"
          className={clsx("px-6 w-full h-[56px] bg-[#F3F4F6] rounded-xl mt-3", {
            ["outline outline-2 outline-red-400"]: errors.tag,
            ["focus:outline outline-2 outline-blue-400"]: !errors.tag,
          })}
        />
        {errors.tag && (
          <p className="text-red-500 text-sm mt-2">{errors.tag}</p>
        )}
        <div className="flex gap-2 flex-wrap mt-2">
          {formData.tags.map((item, index) => (
            <div
              key={index}
              className="py-1 px-3 text-base text-[#1F2937] font-normal bg-[#F3F4F6] rounded-[26px] flex items-center gap-2"
            >
              #{item}
              <button
                type="button"
                className="relative w-[22px] h-[22px]"
                onClick={() => handleRemoveTag(index)}
              >
                <Image src="/ic_X.png" fill />
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default WriteItem;
