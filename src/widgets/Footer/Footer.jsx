import Sns from "./components/Sns/Sns.jsx";
import Terms from "./components/Terms/Terms.jsx";
import Copyright from "./components/Copyright/Copyright.jsx";

export default function Footer() {
  return (
    <div className="w-full bg-[#111827]">
      <div className="mx-auto grid h-[160px] max-w-[1150px] grid-cols-2 px-4 pb-[65px] pt-[32px] text-white md:flex md:justify-between">
        <Copyright />
        <Terms />
        <Sns />
      </div>
    </div>
  );
}
