const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center justify-evenly bg-white mx-6 p-6 rounded shadow-lg min-w-[300px] w-full md:w-[540px] h-[220px] md:h-[250px]"
      >
        <div className="text-[#1F2937] text-base md:text-lg font-medium">
          {children}
        </div>
        <button
          onClick={onClose}
          className="bg-[#3692FF] w-[120px] md:w-[165px] h-[48px] text-[#F3F4F6] text-base font-semibold rounded-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
