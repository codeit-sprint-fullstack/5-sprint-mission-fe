interface PaginationButtonProps {
  num: number;
  click?: () => void;
}

export default function PaginationButton ({num, click} : PaginationButtonProps) {
  return(
    <button
    className="flex justify-center items-center border p-2 rounded-full w-[32px] h-[32px]"
    onClick={click}
    >
      {num}
    </button>
  )
}