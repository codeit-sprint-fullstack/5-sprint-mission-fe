import { useRef, forwardRef, useImperativeHandle } from "react";
import Button from "../Button";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ message }, ref) {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
  }));

  const onClose = () => {
    dialogRef.current.close();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="rounded-[8px] p-[28px] md:p-[23px] backdrop:bg-black backdrop:bg-opacity-70 backdrop:backdrop-blur-[1px]"
    >
      <p className="px-[146px] md:px-[45px] pt-[80px] pb-[47px] text-[#1F2937] font-medium text-[1rem] leading-[20px]">
        {message}
      </p>
      <div className="flex justify-end md:justify-center">
        <Button onClick={onClose}>확인</Button>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
