import BottomBanner from "@/app/_components/BottomBanner";
import MiddleBanner from "@/app/_components/MiddleBanner";
import TopBanner from "@/app/_components/TopBanner";

export default function Home() {
  return (
    <>
      <div className="mt-16">
        <TopBanner />
        <MiddleBanner />
        <BottomBanner />
      </div>
    </>
  );
}
