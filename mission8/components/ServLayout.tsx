import { ReactNode } from "react";
import ServHeader from "./ServHeader";
import Footer from "./Footer";

interface ServLayoutProps {
  children: ReactNode;
}

export default function ServLayout({ children }: ServLayoutProps) {
  return (
    <div>
      <ServHeader />
      <div className="flex xl:w-[1200px] md:w-[100%] justify-center xl:m-auto md:px-4 px-2">{children}</div>
      <Footer />
    </div>
  );
}
