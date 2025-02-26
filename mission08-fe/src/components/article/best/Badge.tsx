import Image from "next/image";
import iconMedal from "@/assets/icons/ic_medal.png";

export default function Badge() {
  return (
    <section className="w-28 flex items-center gap-1 bg-primary-100 rounded-b-2xl px-6 py-2 group-hover:bg-primary-200 transition-colors duration-300">
      <Image src={iconMedal} alt="베스트 상품" width={16} height={16} />
      <span className="text-white font-semibold text-base">Best</span>
    </section>
  );
}
