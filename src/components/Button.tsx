export const Button = ({
  name,
  isDisabled = false,
  handleClick,
}: {
  name: string;
  isDisabled?: boolean;
  handleClick?: () => void;
}) => {
  return (
    <button
      className={`
        ${isDisabled ? "bg-gray-400" : "bg-primary"} 
        ${isDisabled ? "hover:none" : "hover:bg-primary/80"}
        text-white w-[88px] h-[42px] rounded-lg`}
      onClick={handleClick}
      disabled={isDisabled} // 버튼 비활성화
    >
      {name}
    </button>
  );
};
