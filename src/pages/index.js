export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/community",
      permanent: true, // true: 301 리다이렉트, false: 302 리다이렉트
    },
  };
};

export default function Home() {
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
