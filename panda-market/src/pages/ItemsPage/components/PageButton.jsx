function PageButton({ content, isActive = false, onClick, ...props }) {
  const style = {
    backgroundColor: isActive ? "bg-primary-100" : "bg-white",
    textColor: isActive ? "text-white" : "text-secondary-500",
  };
  return (
    <button
      className={`w-[40px] h-[40px] rounded-[40px] border-[1px] border-secondary-200 ${style.textColor} ${style.backgroundColor}`}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

export default PageButton;
