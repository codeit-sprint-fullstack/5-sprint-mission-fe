export default function Card({
  image,
  badge,
  description,
  subDescription,
  isLeft,
}) {
  return (
    <div
      className={`bg-[#FCFCFC] flex items-center w-[988px] gap-[64px] tb:bg-white tb:flex-col tb:w-full tb:gap-[24px] ${
        isLeft ? "tb:items-start" : "tb:items-end"
      }`}
    >
      <img
        src={image}
        alt={description}
        className="w-[588px] h-[auto] tb:w-full"
      />
      <div
        className={`flex flex-col gap-[24px] text-left ${
          isLeft ? "text-left" : "text-right"
        }`}
      >
        <p className="text-[1.125rem] text-[#3692FF] font-bold leading-[26px] md:text-[1rem]">
          {badge}
        </p>
        <h1 className="text-[#374151] text-[2.5rem] font-bold leading-[56px] break-keep break-words tb:text-[2rem] tb:leading-[42px] md:text-[1.5rem] md:leading-[33.6px]">
          {description}
        </h1>
        <h3 className="text-[#374151] text-[1.5rem] font-medium leading-[32px] break-keep break-words tb:text-[1.125rem] tb:leading-[26px] md:leading-[25.2px]">
          {subDescription}
        </h3>
      </div>
    </div>
  );
}
