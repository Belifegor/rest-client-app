import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="grid flex-1 grid-cols-[280px_1fr]">
        <aside className="border-r p-3">sidebar</aside>
        <main className="flex flex-col">
          <div className="flex-1 p-4 space-y-4">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
