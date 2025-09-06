import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const isAuthenticated = true;
  const username = "Jakob Schmidt";

  return (
    <AppShell>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          {!isAuthenticated ? (
            <>
              <h1 className="text-3xl font-bold">Welcome!</h1>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Welcome Back, {username}!</h1>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/client">REST Client</Link>
                </Button>
                <Button asChild>
                  <Link href="/history">History</Link>
                </Button>
                <Button asChild>
                  <Link href="/variables">Variables</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </AppShell>
  );
}
