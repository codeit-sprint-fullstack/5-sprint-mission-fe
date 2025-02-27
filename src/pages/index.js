import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  router.push("/community");
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-600">
          Hello Tailwind in Next.js!
        </h1>
      </div>
    </>
  );
}
