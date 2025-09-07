import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-gray-900 text-white">
      <div className="grid flex-1 grid-cols-[280px_1fr]">
        <aside className="border-r border-gray-700 p-4 bg-gray-800">
          <div className="text-gray-300 font-semibold">Sidebar</div>
        </aside>
        <main className="flex flex-col bg-gray-900">
          <div className="flex-1 p-6 space-y-6">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
