import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import {
  getProductDetail,
  updateProduct,
  checkUserPermission,
} from "@/services/productService";
import Loading from "@/components/common/Loading";
import Modal from "@/components/common/Modal";

// 🔎 유효성 검사를 위한 Custom Hook
const useValidation = (formData) => {
  const errors = {};

  // 상품명 유효성 검사 (1자 이상 10자 이내)
  if (!formData.name || formData.name.length < 1 || formData.name.length > 10) {
    errors.name = "10자 이내로 입력해주세요.";
  }

  // 상품 소개 유효성 검사 (10자 이상 100자 이내)
  if (
    !formData.description ||
    formData.description.length < 10 ||
    formData.description.length > 100
  ) {
    errors.description = "10자 이상 100자 이내로 입력해주세요.";
  }

  // 판매 가격 유효성 검사 (숫자만 허용)
  if (!formData.price || isNaN(formData.price)) {
    errors.price = "숫자로 입력해주세요.";
  }

  // 태그 유효성 검사 (5자 이내)
  if (formData.tags.some((tag) => tag.length > 5)) {
    errors.tags = "5글자 이내로 입력해주세요";
  }

  return errors;
};

const EditManager = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
    tagInput: "",
    images: [],
  });

  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });

  const errors = useValidation(formData);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 상품 데이터 불러오기
  useEffect(() => {
    if (router.isReady && id) {
      const fetchProductData = async () => {
        try {
          setLoading(true);
          console.log("상품 정보 불러오기 시작:", id);
          const productData = await getProductDetail(Number(id));

          if (productData) {
            console.log("상품 정보 로드 성공:", productData);

            // 권한 확인 - 본인의 상품인지 확인
            const hasPermission = checkUserPermission(productData.ownerId);
            if (!hasPermission) {
              console.error("상품을 수정할 권한이 없습니다.");
              setError(
                "상품을 수정할 권한이 없습니다. 자신이 등록한 상품만 수정할 수 있습니다."
              );
              setLoading(false);
              return;
            }

            // 상품 데이터로 폼 초기화
            setFormData({
              name: productData.name || "",
              description: productData.description || "",
              price: productData.price?.toString() || "",
              tags: Array.isArray(productData.tags) ? productData.tags : [],
              tagInput: "",
              images: Array.isArray(productData.images)
                ? productData.images
                : [],
            });
          } else {
            setError("상품 정보를 불러올 수 없습니다.");
          }
        } catch (error) {
          console.error("상품 정보 불러오기 실패:", error);
          setError(
            error.message || "상품 정보를 불러오는 중 오류가 발생했습니다."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [router.isReady, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleTagKeyDown = (e) => {
    const trimmedTag = formData.tagInput.trim();
    const formattedTag = trimmedTag.startsWith("#")
      ? trimmedTag
      : `#${trimmedTag}`;

    if (e.key === "Enter" && trimmedTag) {
      e.preventDefault();
      if (
        !formData.tags.includes(formattedTag) &&
        formData.tags.length < 5 &&
        formattedTag.length <= 6
      ) {
        setFormData({
          ...formData,
          tags: [...formData.tags, formattedTag],
          tagInput: "",
        });
      }
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: updatedTags });
  };

  const isFormValid =
    formData.name &&
    formData.description &&
    formData.price &&
    formData.tags.length > 0 &&
    Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || !id) return;

    // 수정 확인 모달 표시
    setIsConfirmModalOpen(true);
  };

  const confirmEdit = async () => {
    setIsConfirmModalOpen(false);

    try {
      setLoading(true);
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        tags: formData.tags,
        images:
          formData.images.length > 0
            ? formData.images
            : ["https://via.placeholder.com/300"],
      };

      console.log("상품 수정 요청 데이터:", productData);
      console.log("상품 ID:", id);

      const response = await updateProduct(Number(id), productData);

      console.log("상품 수정 응답:", response);
      setModalMessage("상품이 수정되었습니다!");
      setIsResultModalOpen(true);
    } catch (error) {
      console.error("상품 수정 실패:", error);
      setModalMessage(
        `상품 수정 실패: ${error.message || "알 수 없는 오류가 발생했습니다."}`
      );
      setIsResultModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);

    // 성공적으로 수정된 경우 상세 페이지로 이동
    if (modalMessage === "상품이 수정되었습니다!") {
      router.push(`/items/${id}`);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton onClick={() => router.back()}>
          이전 페이지로 돌아가기
        </BackButton>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <ProductContainer>
          <Title>상품 수정하기</Title>
          <SubmitButton type="submit" text="수정" disabled={!isFormValid} />
        </ProductContainer>

        <Label>상품명</Label>
        <InputField
          type="text"
          name="name"
          placeholder="상품명을 입력해주세요."
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          isError={!!errors.name}
        />
        {touched.name && errors.name && (
          <ErrorMessage>{errors.name}</ErrorMessage>
        )}

        <Label>상품 소개</Label>
        <InputField
          type="text"
          name="description"
          placeholder="상품 소개를 입력해주세요."
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          isTextarea={true}
          isError={!!errors.description}
        />
        {touched.description && errors.description && (
          <ErrorMessage>{errors.description}</ErrorMessage>
        )}

        <Label>판매가격</Label>
        <InputField
          type="number"
          name="price"
          placeholder="판매 가격을 입력해주세요."
          value={formData.price}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          isError={!!errors.price}
        />
        {touched.price && errors.price && (
          <ErrorMessage>{errors.price}</ErrorMessage>
        )}

        <Label>태그</Label>
        <InputField
          type="text"
          name="tagInput"
          placeholder="태그를 입력 후 Enter를 눌러주세요."
          value={formData.tagInput}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleTagKeyDown}
        />
        {touched.tags && errors.tags && (
          <ErrorMessage>{errors.tags}</ErrorMessage>
        )}
        <TagContainer>
          {formData.tags.map((tag, index) => (
            <Tag key={index}>
              {tag}
              <DeleteButton onClick={() => handleTagDelete(index)}>
                ×
              </DeleteButton>
            </Tag>
          ))}
        </TagContainer>
      </Form>

      {/* 수정 확인 모달 */}
      <Modal
        isOpen={isConfirmModalOpen}
        message="상품을 수정하시겠습니까?"
        isConfirmModal={true}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmEdit}
        confirmText="수정"
        cancelText="취소"
      />

      {/* 결과 모달 */}
      <Modal
        isOpen={isResultModalOpen}
        message={modalMessage}
        onClose={closeResultModal}
        buttonText="확인"
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 165px;
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  color: #f74747;
  font-size: 14px;
  margin-top: -10px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  background-color: #f3f4f6;
  padding: 6px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.span`
  margin-left: 8px;
  cursor: pointer;
  color: #f9fafb;
  background-color: #9ca3af;
  padding: 2px 6px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  width: 18px;
  height: 18px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: #3692ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #2a75cc;
  }
`;

export default EditManager;
