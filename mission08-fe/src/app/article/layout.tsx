export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-screen-xl w-full p-4 md:p-6 flex flex-col mx-auto">
      {children}
    </main>
  );
}
