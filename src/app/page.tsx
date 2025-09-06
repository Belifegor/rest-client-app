import AppShell from "@/components/layout/AppShell";
import WelcomeMessage from "@/components/WelcomeMessage";

export default function HomePage() {
  const isAuthenticated = true;
  const username = "Jakob Schmidt";

  return (
    <AppShell>
      <WelcomeMessage isAuthenticated={isAuthenticated} username={username} />
    </AppShell>
  );
}
