import pandaLogoBig from "@/assets/icons/panda-logo-big.svg";
import pandaNameBig from "@/assets/icons/panda-name-big.svg";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex flex-row gap-3 justify-center">
        <Image src={pandaLogoBig} alt="panda-logo" width={52} height={52} />
        <Image
          src={pandaNameBig}
          alt="panda-logo-name"
          width={104}
          height={104}
        />
      </div>
    </Link>
  );
}
