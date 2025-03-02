interface ButtonProps {
  name: string;
  disabled: boolean;
  click?: () => void;
}

export default function Button ({name, disabled, click} : ButtonProps) {
  return(
    <button
    className={`px-[23px] py-[12px] rounded-lg text-white ${disabled ? "bg-gray-400 cursor-not-allowed text-[16px] font-semibold" : "bg-[#3692FF] hover:bg-[#366cff]"}`}
    disabled={disabled} // disabled 속성 적용
    onClick={click}
    >
      {name}
    </button>
  )
}