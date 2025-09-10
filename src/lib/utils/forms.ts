import { ROUTES } from "@/constants/routes";

export function redirectToHome() {
  if (typeof window !== "undefined") {
    window.location.href = ROUTES.HOME;
  }
}

export function parseError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}
