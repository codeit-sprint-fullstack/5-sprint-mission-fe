import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  createArticle,
  getArticleById,
  updateArticle,
} from "@/services/articleService";
import Loading from "@/components/common/Loading";

/**
 * 게시글 작성/수정 페이지 컴포넌트
 * 제목, 이미지 URL, 내용을 입력받아 새 게시글을 생성하거나 기존 게시글을 수정
 */
const WritePage = () => {
  const router = useRouter();
  const { id } = router.query; // URL에서 게시글 ID 추출
  const isEditMode = Boolean(id); // ID가 있으면 수정 모드

  // 상태 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  // 모든 필드가 채워졌는지 확인
  const isFormValid = formData.title && formData.content && formData.imageUrl;

  // 수정 모드일 경우 기존 게시글 데이터 가져오기
  useEffect(() => {
    const fetchArticle = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const article = await getArticleById(id);
          setFormData({
            title: article.title || "",
            content: article.content || "",
            imageUrl: article.imageUrl || "",
          });
        } catch (err) {
          setError("게시글을 불러오는데 실패했습니다.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, isEditMode]);

  /**
   * 입력 필드 변경 핸들러
   * @param {Event} e - 입력 이벤트 객체
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * 폼 제출 핸들러
   * 게시글을 생성하거나 수정하고 성공 시 해당 게시글 상세 페이지로 이동
   * @param {Event} e - 폼 제출 이벤트 객체
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("제목, 내용, 이미지 URL을 모두 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      let result;

      if (isEditMode) {
        // 게시글 수정
        result = await updateArticle(id, formData);
      } else {
        // 새 게시글 작성
        result = await createArticle(formData);
      }

      // 생성/수정된 게시글의 상세 페이지로 이동
      router.push(`/article/${result.id}`);
    } catch (err) {
      setError(
        err.message || `게시글 ${isEditMode ? "수정" : "작성"}에 실패했습니다.`
      );
    } finally {
      setLoading(false);
    }
  };

  // 로딩 중일 때 로딩 컴포넌트 표시
  if (loading) return <Loading />;

  return (
    <Container>
      <Title>{isEditMode ? "글 수정하기" : "글쓰기"}</Title>
      <Form onSubmit={handleSubmit}>
        {/* 에러 메시지 표시 */}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/* 제목 입력 필드 */}
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목을 입력해주세요"
            required
          />
        </FormGroup>

        {/* 이미지 URL 입력 필드 */}
        <FormGroup>
          <Label htmlFor="imageUrl">이미지 URL</Label>
          <Input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="이미지 URL을 입력해주세요 (예: https://example.com/image.jpg)"
            required
          />
        </FormGroup>

        {/* 내용 입력 필드 */}
        <FormGroup>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="내용을 상세히 입력해주세요"
            rows={10}
            required
          />
        </FormGroup>

        {/* 버튼 그룹 */}
        <ButtonGroup>
          <CancelButton type="button" onClick={() => router.back()}>
            취소
          </CancelButton>
          <SubmitButton type="submit" disabled={!isFormValid}>
            {isEditMode ? "수정하기" : "등록하기"}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

// 컨테이너 스타일
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

// 제목 스타일
const Title = styled.h1`
  font-size: 2rem;
  color: #111827;
  margin-bottom: 2rem;
`;

// 폼 스타일
const Form = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// 폼 그룹 스타일
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// 라벨 스타일
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
`;

// 입력 필드 스타일
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3692ff;
    box-shadow: 0 0 0 3px rgba(54, 146, 255, 0.1);
  }
`;

// 텍스트 영역 스타일
const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  min-height: 200px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3692ff;
    box-shadow: 0 0 0 3px rgba(54, 146, 255, 0.1);
  }
`;

// 버튼 그룹 스타일
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

// 기본 버튼 스타일
const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

// 제출 버튼 스타일
const SubmitButton = styled(Button)`
  background-color: #3692ff;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: #2a75cc;
  }

  &:disabled {
    background-color: #9cb8db;
    cursor: not-allowed;
  }
`;

// 취소 버튼 스타일
const CancelButton = styled(Button)`
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #e5e7eb;
  }
`;

// 에러 메시지 스타일
const ErrorMessage = styled.div`
  color: #ef4444;
  background-color: #fee2e2;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
`;

export default WritePage;
