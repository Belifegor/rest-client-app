import AppShell from "@/components/layout/AppShell";
import WelcomeMessage from "@/components/WelcomeMessage";

export default function HomePage() {
  const isAuthenticated = true;
  const username = "Jakob Schmidt";

  return (
    <AppShell>
      <main className="flex flex-1 items-center justify-center p-6">
        <WelcomeMessage isAuthenticated={isAuthenticated} username={username} />
      </main>
    </AppShell>
  );
}
