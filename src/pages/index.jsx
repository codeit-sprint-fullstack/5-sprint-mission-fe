import BaseLayout from "@/components/shared/BaseLayout";
import BottomBanner from "@/components/home/BottomBanner";
import MiddleBanner from "@/components/home/MiddleBanner";
import TopBanner from "@/components/home/TopBanner";

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

Home.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
