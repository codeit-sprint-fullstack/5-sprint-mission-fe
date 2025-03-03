function LabeledBox({ labelImage, labelText, children }) {
  return (
    <div className="px-[24px] pb-[16px] bg-[#F9FAFB] rounded-[8px]">
      <h1 className="inline-flex justify-center items-center gap-[8px] px-[24px] py-[2px] w-auto bg-brand-color-100 text-[#FFFFFF] font-[600] rounded-br-[16px] rounded-bl-[16px]">
        {labelImage} {labelText}
      </h1>
      <div>{children}</div>
    </div>
  );
}

export default LabeledBox;
