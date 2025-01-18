export default function Button ({ children, onClick, isDisabled }) {
    return (
        <button disabled={isDisabled} onClick={onClick} className="px-[43px] py-[11px] rounded-lg bg-[#3692FF] text-white font-bold cursor-pointer">
            {children}
        </button>
    )
}