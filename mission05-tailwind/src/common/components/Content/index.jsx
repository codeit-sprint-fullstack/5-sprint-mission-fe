export default function Content({ children, ...props }) {
  return (
    <div
      className="w-full max-w-screen-xl flex flex-col items-center justify-center mx-auto px-[24px] md:px-[16px]"
      {...props}
    >
      {children}
    </div>
  );
}
