import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

type WelcomeMessageProps = {
  isAuthenticated?: boolean;
  username?: string;
};

export default function WelcomeMessage({ isAuthenticated = false, username }: WelcomeMessageProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center gap-6 h-full bg-gray-900 text-white p-6">
      {!isAuthenticated ? (
        <>
          <h1 className="text-4xl font-bold">Welcome!</h1>
          <div className="flex gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 text-white px-6 py-2 rounded shadow-md transition"
            >
              <Link href={ROUTES.SIGN_IN}>Sign In</Link>
            </Button>
            <Button
              variant="secondary"
              asChild
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded shadow-md transition"
            >
              <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold">Welcome Back, {username}!</h1>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 text-white px-6 py-2 rounded shadow-md transition"
            >
              <Link href={ROUTES.CLIENT}>REST Client</Link>
            </Button>
            <Button
              asChild
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded shadow-md transition"
            >
              <Link href={ROUTES.HISTORY}>History</Link>
            </Button>
            <Button
              asChild
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded shadow-md transition"
            >
              <Link href={ROUTES.VARIABLES}>Variables</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
