export default function Feature({ image, label, title, description }) {
  return (
    <div className="px-4 md:px-6 xl:px-0 xl:flex xl:gap-[64px]">
      <img src={image} alt="feature" className="w-full" />
      <div className="xl:flex xl:flex-col xl:justify-center">
      <p className="text-[#3692FF] font-bold mt-[24px] xl:mt-0 md:text-[18px]">{label}</p>
      <p className="text-[#374151] font-bold text-[24px] mt-2 md:text-[32px] xl:text-[40px] xl:break-words">{title}</p>
      <p className="text-[#374151] mt-4 xl:text-[24px] xl:break-words">{description}</p>
      </div>
    </div>
  );
}
