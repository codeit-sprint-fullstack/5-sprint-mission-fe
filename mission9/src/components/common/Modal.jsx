import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9998;
`;

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

const CheckIcon = styled.div`
  color: white;
  font-size: 20px;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  color: #1f2937;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
`;

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && isOpen && confirmButtonRef.current) {
        e.preventDefault();
        if (isConfirmModal) {
          onConfirm && onConfirm();
        } else {
          onClose && onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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

export default Modal;
