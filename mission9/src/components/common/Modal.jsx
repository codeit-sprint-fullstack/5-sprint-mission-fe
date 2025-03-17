import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

/* 기능: 모달 컴포넌트
 * @param {Object} props - 모달 속성
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {string} props.message - 모달 메시지
 * @param {function} props.onClose - 닫기 핸들러
 * @param {string} props.buttonText - 버튼 텍스트 (기본값: "확인")
 * @param {boolean} props.isConfirmModal - 확인 모달 여부
 * @param {function} props.onConfirm - 확인 핸들러
 * @param {string} props.confirmText - 확인 버튼 텍스트 (기본값: "네")
 * @param {string} props.cancelText - 취소 버튼 텍스트 (기본값: "취소")
 * @param {boolean} props.isDelete - 삭제 모달 여부
 */
const Modal = ({
  isOpen,
  message,
  onClose,
  buttonText = "확인",
  isConfirmModal = false,
  onConfirm,
  confirmText = "네",
  cancelText = "취소",
  isDelete = false,
}) => {
  const confirmButtonRef = useRef(null);

  /* 로직: 키보드 이벤트 처리 */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && isOpen && confirmButtonRef.current) {
        e.preventDefault();
        if (isConfirmModal) {
          onConfirm?.();
        } else {
          onClose?.();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isConfirmModal, onConfirm, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay className="modal-overlay">
      <ModalBox className="modal-box">
        <IconContainer isDelete={isDelete}>
          <CheckIcon>✓</CheckIcon>
        </IconContainer>
        <ModalMessage>{message}</ModalMessage>
        {isConfirmModal ? (
          <ButtonsContainer>
            <CancelButton onClick={onClose}>{cancelText}</CancelButton>
            <ConfirmButton
              ref={confirmButtonRef}
              isDelete={isDelete}
              onClick={onConfirm}
            >
              {confirmText}
            </ConfirmButton>
          </ButtonsContainer>
        ) : (
          <ButtonsContainer>
            <ConfirmButton ref={confirmButtonRef} onClick={onClose}>
              {buttonText}
            </ConfirmButton>
          </ButtonsContainer>
        )}
      </ModalBox>
    </ModalOverlay>
  );
};

/* 스타일: 모달 오버레이 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9998;
`;

/* 스타일: 모달 컨테이너 */
const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 298px;
  height: 202px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  z-index: 9999;
  padding: 20px;
`;

/* 스타일: 아이콘 컨테이너 */
const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => (props.isDelete ? "#F74747" : "#3692FF")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

/* 스타일: 체크 아이콘 */
const CheckIcon = styled.div`
  color: white;
  font-size: 20px;
`;

/* 스타일: 모달 메시지 */
const ModalMessage = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  color: #1f2937;
  text-align: center;
  margin-bottom: 30px;
`;

/* 스타일: 버튼 컨테이너 */
const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
`;

/* 스타일: 취소 버튼 */
const CancelButton = styled.button`
  flex: 1;
  height: 48px;
  border: 1px solid #e5e7eb;
  background-color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
`;

/* 스타일: 확인 버튼 */
const ConfirmButton = styled.button`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.isDelete ? "#F74747" : "#3692FF")};
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
`;

export default Modal;
