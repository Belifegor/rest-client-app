import WelcomeMessage from "@/components/WelcomeMessage";

export default function HomePage() {
  const isAuthenticated = true;
  const username = "Jakob Schmidt";

  return <WelcomeMessage isAuthenticated={isAuthenticated} username={username} />;
}
